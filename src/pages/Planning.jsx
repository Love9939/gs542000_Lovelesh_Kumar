import { Box, Typography } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Planning() {
  const stores = useSelector(state => state.stores.stores);
  const skus = useSelector(state => state.skus.skus);

  const columnDefs = useMemo(() => [
    {
      headerName: 'Store',
      field: 'store',
      pinned: 'left',
      width: 200,
      filter: true
    },
    {
      headerName: 'SKU',
      field: 'sku',
      pinned: 'left',
      width: 200,
      filter: true
    },
    {
      headerName: 'Week 01',
      children: [
        {
          headerName: 'Sales Units',
          field: 'W01_SalesUnits',
          editable: true,
          type: 'numericColumn',
          width: 120,
          valueParser: params => Number(params.newValue)
        },
        {
          headerName: 'Sales Dollars',
          field: 'W01_SalesDollars',
          valueFormatter: params => `$ ${Number(params.value || 0).toFixed(2)}`,
          width: 120
        },
        {
          headerName: 'GM Dollars',
          field: 'W01_GmDollars',
          valueFormatter: params => `$ ${Number(params.value || 0).toFixed(2)}`,
          width: 120
        },
        {
          headerName: 'GM Percent',
          field: 'W01_GmPercent',
          valueFormatter: params => `${Number(params.value || 0).toFixed(2)}%`,
          cellStyle: params => {
            const value = params.value || 0;
            if (value >= 80) return { backgroundColor: '#4CAF50', color: 'white' };
            if (value >= 40) return { backgroundColor: '#FFEB3B' };
            if (value >= 20) return { backgroundColor: '#FF9800', color: 'white' };
            return { backgroundColor: '#F44336', color: 'white' };
          },
          width: 120
        }
      ]
    },
    {
      headerName: 'Week 02',
      children: [
        {
          headerName: 'Sales Units',
          field: 'W02_SalesUnits',
          editable: true,
          type: 'numericColumn',
          width: 120,
          valueParser: params => Number(params.newValue)
        },
        {
          headerName: 'Sales Dollars',
          field: 'W02_SalesDollars',
          valueFormatter: params => `$ ${Number(params.value || 0).toFixed(2)}`,
          width: 120
        },
        {
          headerName: 'GM Dollars',
          field: 'W02_GmDollars',
          valueFormatter: params => `$ ${Number(params.value || 0).toFixed(2)}`,
          width: 120
        },
        {
          headerName: 'GM Percent',
          field: 'W02_GmPercent',
          valueFormatter: params => `${Number(params.value || 0).toFixed(2)}%`,
          cellStyle: params => {
            const value = params.value || 0;
            if (value >= 80) return { backgroundColor: '#4CAF50', color: 'white' };
            if (value >= 40) return { backgroundColor: '#FFEB3B' };
            if (value >= 20) return { backgroundColor: '#FF9800', color: 'white' };
            return { backgroundColor: '#F44336', color: 'white' };
          },
          width: 120
        }
      ]
    }
  ], []);

  const initialRowData = useMemo(() => {
    return stores.flatMap(store => 
      skus.map(sku => ({
        store: store.name,
        sku: sku.name,
        price: Number(sku.price),
        cost: Number(sku.cost),
        W01_SalesUnits: 200,
        W01_SalesDollars: 200 * Number(sku.price),
        W01_GmDollars: (200 * Number(sku.price)) - (200 * Number(sku.cost)),
        W01_GmPercent: ((200 * Number(sku.price)) - (200 * Number(sku.cost))) / (200 * Number(sku.price)) * 100,
        W02_SalesUnits: 0,
        W02_SalesDollars: 0,
        W02_GmDollars: 0,
        W02_GmPercent: 0
      }))
    );
  }, [stores, skus]);

  const onCellValueChanged = (params) => {
    const { data, colDef } = params;
    const week = colDef.field.split('_')[0];
    const salesUnits = Number(params.newValue) || 0;
    const price = Number(data.price);
    const cost = Number(data.cost);

    // Calculate values
    const salesDollars = salesUnits * price;
    const gmDollars = salesDollars - (salesUnits * cost);
    const gmPercent = salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;

    // Update data using the grid API
    const node = params.node;
    node.setDataValue(`${week}_SalesUnits`, salesUnits);
    node.setDataValue(`${week}_SalesDollars`, salesDollars);
    node.setDataValue(`${week}_GmDollars`, gmDollars);
    node.setDataValue(`${week}_GmPercent`, gmPercent);
  };

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 100px)' }}>
      <Typography variant="h4" mb={3}>Planning</Typography>
      <div className="ag-theme-alpine" style={{ height: 'calc(100% - 60px)', width: '100%' }}>
        <AgGridReact
          rowData={initialRowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            resizable: true,
            minWidth: 100
          }}
          onCellValueChanged={onCellValueChanged}
          suppressMovableColumns={true}
          enableRangeSelection={true}
          copyHeadersToClipboard={true}
          suppressScrollOnNewData={true}
          suppressPropertyNamesCheck={true}
        />
      </div>
    </Box>
  );
}

export default Planning;