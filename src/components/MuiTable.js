import React, { useEffect, useState, forwardRef, useMemo } from "react";
import MaterialTable from "@material-table/core";
// import MaterialTable from "material-table";

import { ExportCsv, ExportPdf } from "@material-table/exporters";

import { Checkbox, Select, MenuItem } from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowUpward from "@mui/icons-material/ArrowUpward";

import AddCircleIcon from "@mui/icons-material/AddCircle";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const MuiTable = ({
  tableData,
  setTableData,
  tableTitle,
  tableColumns,
  handleShowEditForm,
  handleDelete,
  showEdit,
  showDelete,
  loading = false,
  excelexporting,
  downloadExcel,
  tableRowAdd,
  tableRowUpdate,
  tableRowDelete,
  showAddMoreServices,
  handleAddMoreServices,
  addindmoreservicesIcon = <AddCircleIcon style={{ color: "blue" }} />,
  addindmoreservicesTitle = "add services",
  showRowAdd = true,
  hideShowRowDelete = false,
  hideShowRowUpdate = false
}) => {
  const [mTableActions, setMTableActions] = useState([]);
  console.log("table data is ", tableData);
  useEffect(() => {
    let editingAction = showEdit && {
      icon: () => <Edit style={{ color: "#008000aa" }} />,
      tooltip: "edit",
      onClick: (e, data) => handleShowEditForm(data),
      isFreeAction: false
    };

    // console.log('edditing action : ', editingAction)

    let deletingAction = showDelete && {
      icon: () => <DeleteOutline style={{ color: "red" }} />,
      tooltip: "delete",
      onClick: (e, data) => handleDelete(e, data.id),
      isFreeAction: false
    };

    let addindmoreservices = showAddMoreServices && {
      icon: () => addindmoreservicesIcon,
      tooltip: addindmoreservicesTitle,
      onClick: (e, data) => handleAddMoreServices(e, data),
      isFreeAction: false
    };
    let mytableactions = [];
    editingAction && mytableactions.push(editingAction);
    deletingAction && mytableactions.push(deletingAction);
    addindmoreservices && mytableactions.push(addindmoreservices);
    // let excelexportingAction = excelexporting && {
    //   icon: () => <FileDownloadIcon />,
    //   tooltip: 'Export to Excel',
    //   onClick: () => downloadExcel(),
    //   isFreeAction: true,
    // }

    // setMTableActions([{ ...editingAction }, { ...deletingAction }]);
    mytableactions.length > 0 && setMTableActions(mytableactions);
  }, []);
  console.log("mTableActions : ", mTableActions);

  const [filter, setFilter] = useState(false);
  const handleMaterialTableCheckboxChange = () => {
    setFilter(!filter);
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        isLoading={loading}
        columns={tableColumns}
        data={tableData}
        title={tableTitle}
        editable={{
          isEditHidden: (row) => hideShowRowUpdate,
          isDeleteHidden: (row) => hideShowRowDelete,

          onRowAdd:
            showRowAdd &&
            ((newData) =>
              new Promise((resolve, reject) => {
                tableRowAdd(newData);
                resolve();
                // setTimeout(() => {
                //   setTableData([...tableData, newData]);
                //   resolve();
                // }, 1000);
              })),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              tableRowUpdate(newRow);
              // console.log("Now Am Updating the rows");
              // let updatedData = [...tableData];
              // console.log("the index is : ", oldRow.tableData.index);
              // updatedData[oldRow.tableData.index] = newRow;
              // setTableData(updatedData);
              // console.log("new row and old rows are : ", newRow, oldRow);
              // console.log("updated data is : ", updatedData);
              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                tableRowDelete(oldData);
                // const dataDelete = [...tableData];
                // console.log("old data is ", oldData);
                // const index = oldData.id - 1;
                // dataDelete.splice(index, 1);
                // setTableData([...dataDelete]);

                resolve();
              }, 1000);
            })
        }}
        options={{
          addRowPosition: "first",
          filtering: filter,
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          paging: true,
          pageSizeOptions: [5, 10, 15],
          pageSize: 5,
          paginationPosition: "bottom",
          exportButton: true,
          exportAllData: true,
          exportFileNme: "Sub Project Lists",
          actionsColumnIndex: -1,
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0
              ? { background: "#f5f5f5", height: "20px", padding: "0" }
              : null,
          headerStyle: {
            background: "#1171ef",
            color: "#fff",
            "&:hover": {
              background: "#efefef"
            }
          },
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "myPdfFileName")
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "myCsvFileName")
            }
          ]
        }}
        localization={{
          toolbar: {
            showColumnsAriaLabel: "Show Columns",
            exportTitle: "Export",
            exportAriaLabel: "Export",
            exportName: "Export as CSV",
            exportCSVName: "Export as CSV",
            exportPDFName: "Export as PDF"
          }
        }}
        actions={[
          {
            icon: () => (
              <Checkbox
                color="primary"
                checked={filter}
                onChange={handleMaterialTableCheckboxChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            ),
            tooltip: "Hide/Show Filter option",
            isFreeAction: true
          },
          excelexporting && {
            icon: () => <FileDownloadIcon />, // you can pass icon too
            tooltip: "Export to Excel",
            onClick: () => downloadExcel(),
            isFreeAction: true
          },
          ...mTableActions
        ]}
      />
    </div>
  );
};

export default MuiTable;
