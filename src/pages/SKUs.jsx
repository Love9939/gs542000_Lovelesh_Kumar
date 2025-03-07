import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addSku, updateSku, deleteSku } from '../store/skusSlice';

function SKUs() {
  const dispatch = useDispatch();
  const skus = useSelector(state => state.skus.skus);
  const [open, setOpen] = useState(false);
  const [skuData, setSkuData] = useState({ name: '', price: '', cost: '' });
  const [editId, setEditId] = useState(null);

  const handleOpen = (sku = null) => {
    if (sku) {
      setSkuData({ name: sku.name, price: sku.price, cost: sku.cost });
      setEditId(sku.id);
    } else {
      setSkuData({ name: '', price: '', cost: '' });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleSave = () => {
    const formattedData = {
      ...skuData,
      price: Number(skuData.price),
      cost: Number(skuData.cost)
    };

    if (editId) {
      dispatch(updateSku({ id: editId, ...formattedData }));
    } else {
      dispatch(addSku({ id: Date.now(), ...formattedData }));
    }
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">SKUs</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          NEW SKU
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skus.map((sku) => (
              <TableRow key={sku.id}>
                <TableCell>{sku.name}</TableCell>
                <TableCell align="right">${Number(sku.price).toFixed(2)}</TableCell>
                <TableCell align="right">${Number(sku.cost).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(sku)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => dispatch(deleteSku(sku.id))}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? 'Edit SKU' : 'Add SKU'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="SKU Name"
            value={skuData.name}
            onChange={e => setSkuData({ ...skuData, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            type="number"
            value={skuData.price}
            onChange={e => setSkuData({ ...skuData, price: e.target.value })}
            InputProps={{
              startAdornment: '$'
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Cost"
            type="number"
            value={skuData.cost}
            onChange={e => setSkuData({ ...skuData, cost: e.target.value })}
            InputProps={{
              startAdornment: '$'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SKUs;