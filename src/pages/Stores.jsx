import { useState } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, IconButton
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addStore, updateStore, deleteStore } from '../store/storesSlice';

function Store() {
  const dispatch = useDispatch();
  const stores = useSelector(state => state.stores.stores);
  const [open, setOpen] = useState(false);
  const [storeData, setStoreData] = useState({ name: '', city: '', state: '' });
  const [editId, setEditId] = useState(null);

  const handleOpen = (store = null) => {
    if (store) {
      setStoreData({ name: store.name, city: store.city, state: store.state });
      setEditId(store.id);
    } else {
      setStoreData({ name: '', city: '', state: '' });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (editId) {
      dispatch(updateStore({ id: editId, ...storeData }));
    } else {
      dispatch(addStore({ id: Date.now(), ...storeData }));
    }
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Stores</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          NEW STORE
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store, index) => (
              <TableRow key={store.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.city}</TableCell>
                <TableCell>{store.state}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(store)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => dispatch(deleteStore(store.id))}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? 'Edit Store' : 'Add Store'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Store Name"
            value={storeData.name}
            onChange={e => setStoreData({ ...storeData, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="City"
            value={storeData.city}
            onChange={e => setStoreData({ ...storeData, city: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="State"
            value={storeData.state}
            onChange={e => setStoreData({ ...storeData, state: e.target.value })}
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

export default Store;