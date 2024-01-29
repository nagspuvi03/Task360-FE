import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";

// Import Scroll Bar - SimpleBar
import SimpleBar from 'simplebar-react';

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { Col, Modal, ModalBody, Row, Label, Input, Button, ModalHeader, FormFeedback, Form } from 'reactstrap';

import {
  OrdersId,
  handleValidDate
} from "./TaskListCol";

import { Link } from 'react-router-dom';
import moment from 'moment';

const AllTasks = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [TaskList, setTaskList] = useState([
    {
        id: 1,
        taskId: "#VLZ632",
        project: "Task360",
        task: "Error message when placing an orders?",
        customer: "Akranta",
        function: "Office",
        assigned: "Yes",
        taskType: "Project",
        dueDate: "25 Jan, 2022",
        status: "Not Completed",
        priority: "High",
        responsibility: "Nagappan",
        active: "Active",
        logDate: "28 Jan, 2022",
        statusDate: "27 Jan, 2022",
        timeTaken: 36,
        remarks: "Good"
    },
    {
        id: 2,
        taskId: "#VLZ453",
        project: "Task360",
        task: "Profile Page Structure",
        customer: "Akranta",
        function: "Mechanical",
        assigned: "Yes",
        taskType: "Direct",
        dueDate: "20 Dec, 2021",
        status: "Pending",
        priority: "Low",
        responsibility: "Purushoth",
        active: "Active",
        logDate: "28 Jan, 2022",
        statusDate: "27 Jan, 2022",
        timeTaken: 36,
        remarks: "Good"
    },
    {
        id: 3,
        taskId: "#VLZ454",
        project: "Task360",
        task: "Profile Page Structure",
        customer: "Akranta",
        function: "Electrical",
        assigned: "Yes",
        taskType: "Project",
        dueDate: "20 Dec, 2021",
        status: "Accepted",
        priority: "Low",
        responsibility: "Purushoth",
        active: "Active",
        logDate: "28 Jan, 2022",
        statusDate: "27 Jan, 2022",
        timeTaken: 36,
        remarks: "Good"
    },
    {
        id: 4,
        taskId: "#VLZ455",
        project: "Task360",
        task: "Profile Page Structure",
        customer: "Akranta",
        function: "General",
        assigned: "No",
        taskType: "Project",
        dueDate: "20 Dec, 2021",
        status: "Closed",
        priority: "Medium",
        responsibility: "Purushoth",
        active: "Inactive",
        logDate: "28 Jan, 2022",
        statusDate: "27 Jan, 2022",
        timeTaken: 36,
        remarks: "Good"
    },
  ]);
  const [modal, setModal] = useState(false);
  const [editableRowId, setEditableRowId] = useState(null);
  const [originalRowData, setOriginalRowData] = useState({});
  const [editedRowData, setEditedRowData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [lastId, setLastId] = useState(4);
  const [lastTaskId, setLastTaskId] = useState(0);
  const [newTaskIds, setNewTaskIds] = useState([]);

  const toggle = useCallback(() => {
      setModal(!modal);
  }, [modal]);

  const updateMyData = (rowIndex, columnId, value) => {
  setTaskList(old =>
    old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    })
  );
};


  const EditableCell = ({
  initialValue,
  row,
  column,
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value || ''} onChange={onChange} onBlur={onBlur} />;
};

  const handleCreateTask = () => {
    const newId = lastId + 1;
    setLastId(newId);

    const newTask = {
      id: newId,
      taskId: generateNextTaskId(),
      taskType: "Direct",
      project: "",
      customer: "",
      function: "",
      task: "",
      priority: "High",
      assigned: "No",
      responsibility: "",
      dueDate: moment().format('YYYY-MM-DD'),
      logDate: moment().format('YYYY-MM-DD'),
      status: "New",
      statusDate: moment().format('YYYY-MM-DD'),
      remarks: "",
      timeTaken: "",
      active: "Active",
    }
    setTaskList([newTask, ...TaskList]);
    setEditableRowId(newId);
    setNewTaskIds([...newTaskIds, newId]);
    setEditedRowData(newTask);
  }

  const generateNextTaskId = () => {
    const nextTaskId = lastTaskId + 1;
    setLastTaskId(nextTaskId);
    return `#PUVI${nextTaskId.toString().padStart(2, '0')}`;
  };


  const handleEditClick = (taskData) => {
    setEditableRowId(taskData.id);
    setOriginalRowData(taskData);

    const isCreatingNewTask = !taskData.dueDate && !taskData.logDate && !taskData.statusDate;

    setEditedRowData({
      ...taskData,
      // dueDate: taskData.dueDate ? moment(taskData.dueDate, 'DD MMM Y').format('YYYY-MM-DD') : "", 
      // logDate: taskData.logDate ? moment(taskData.logDate, 'DD MMM Y').format('YYYY-MM-DD') : "", 
      // statusDate: isCreatingNewTask ? moment().format('YYYY-MM-DD') : moment(taskData.statusDate, 'DD MMM Y').format('YYYY-MM-DD'),
      dueDate: taskData.dueDate ? moment(taskData.dueDate, 'DD MMM Y').format('YYYY-MM-DD') : '', 
      logDate: taskData.logDate ? moment(taskData.logDate, 'DD MMM Y').format('YYYY-MM-DD') : '', 
      statusDate: taskData.statusDate ? moment(taskData.statusDate, 'DD MMM Y').format('YYYY-MM-DD') : '',
    });
  };

  const handleCancelClick = () => {
    if (newTaskIds.includes(editableRowId)) {
      setTaskList(TaskList.filter(task => task.id !== editableRowId));
      setNewTaskIds(newTaskIds.filter(id => id !== editableRowId));
    } else {
      setTaskList(prevTaskList =>
        prevTaskList.map(task =>
          task.id === editableRowId ? originalRowData : task
        )
      );
    }
    setEditableRowId(null);
    setEditedRowData({});
  };

  const handleApplyClick = () => {
    setTaskList(prevTaskList => {
      if (newTaskIds.includes(editableRowId)) {
        return prevTaskList.map(task => task.id === editableRowId ? editedRowData : task);
      } else {
        return prevTaskList.map(task => {
          if (task.id === editableRowId) {
            return { ...task, ...editedRowData };
          }
          return task;
        });
      }
    });
    setEditableRowId(null);
    setEditedRowData({});
    setNewTaskIds(prevIds => prevIds.filter(id => id !== editableRowId));
  };

  const handleEditChange = (value, accessor) => {
    console.log(`handleEditChange called for ${accessor} with value: ${value}`);
    if(['dueDate', 'logDate', 'statusDate'].includes(accessor)) {
      value = moment(value).format('YYYY-MM-DD');
    }
    let updatedData = { ...editedRowData, [accessor]: value };
    if (accessor === "taskType" && newTaskIds.includes(editableRowId)) {
      if (value === "Direct") {
        updatedData = {
          ...updatedData,
          project: "",
          responsibility: "",
          status: "",
          statusDate: "",
          active: "",
        };
      } else if (value === "Project") {
          updatedData = {
            ...updatedData,
            responsibility: "",
            status: "",
            statusDate: "",
            active: "",
          };
      }
    }
    setEditedRowData(updatedData);
  };

  const handleDeleteClick = (taskId) => {
    setShowDeleteModal(true);
    setTaskToDelete(taskId);
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  }

  const handleConfirmDelete = () => {
    if(taskToDelete !== null) {
      setTaskList((currentTaskList) => currentTaskList.filter((task) => task.id !== taskToDelete));
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  }

  const getCellStyle = (isEditing) => {
    return isEditing ? { minWidth: '150px' } : {};
  };

  const columns = useMemo(
    () => [
      {
        Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        Cell: (cellProps) => {
          return <input type="checkbox" className="taskCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
      {
        Header: "Task ID",
        accessor: "taskId",
        filterable: false,
        Cell: (cellProps) => {
          return <OrdersId {...cellProps} />;
        },
      },
      {
        Header: "Task Type",
        accessor: "taskType",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.taskType ?? "Direct"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "taskType")
                }
                style={cellStyle}
              >
                <option value="Project">Project</option>
                <option value="Direct">Direct</option>
              </Input>
            );
          }
          let badgeClass = '';
          if (row.original.taskType === "Project") badgeClass = "bg-success";
          if (row.original.taskType === "Direct") badgeClass = "bg-danger";
          return (
            <span className={`badge ${badgeClass} text-uppercase`}>
              {row.original.taskType}
            </span>
          );
        },
      },
      {
        Header: "Project Name",
        accessor: "project",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.project ?? ""}
                onChange={(e) => 
                  handleEditChange(e.target.value, "project")
                }
                style={cellStyle}
                disabled={editedRowData.taskType === "Direct" && newTaskIds.includes(editableRowId)}
              >
                <option value="">Select</option>
                <option value="Task360">Task360</option>
                <option value="ITC">ITC</option>
                <option value="HRMS">HRMS</option>
              </Input>
            );
          }
          return <span>{row.original.project}</span>
        },
      },
      {
        Header: "Customer",
        accessor: "customer",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.customer ?? ""}
                onChange={(e) => 
                  handleEditChange(e.target.value, "customer")
                }
                style={cellStyle}
              >
                <option value="">Select</option>
                <option value="Akranta">Akranta</option>
                <option value="Vamtech">Vamtech</option>
                <option value="Zoho">Zoho</option>
              </Input>
            );
          }
          return <span>{row.original.customer}</span>
        },
      },
      {
        Header: "Function",
        accessor: "function",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.function ?? ""}
                onChange={(e) => 
                  handleEditChange(e.target.value, "function")
                }
                style={cellStyle}
              >
                <option value="">Select</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electrical">Electrical</option>
                <option value="Office">Office</option>
                <option value="Generic">Generic</option>
              </Input>
            );
          }
          return <span>{row.original.function}</span>
        },
      },
      {
        Header: "Task Description",
        accessor: "task",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='text'
                value={editedRowData.task}
                onChange={(e) => 
                  handleEditChange(e.target.value, "task")
                }
                style={cellStyle}
              />
            );
          };
          return (
            <div className="d-flex">
              <div className="flex-grow-1 tasks_name">{row.original.task}</div>
              <div className="flex-shrink-0 ms-4">
                <ul className="list-inline tasks-list-menu mb-0">
                  <li className="list-inline-item">
                    <Link to="/apps-tasks-details">
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" onClick={() => handleEditClick(row.original)}>
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#" className="remove-item-btn" onClick={() => handleDeleteClick(row.original.id)}>
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Priority",
        accessor: "priority",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.priority ?? "High"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "priority")
                }
                style={cellStyle}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Input>
            );
          }
          let badgeClass = '';
          if (row.original.priority === "High") badgeClass = "bg-danger";
          if (row.original.priority === "Medium") badgeClass = "bg-warning";
          if (row.original.priority === "Low") badgeClass = "bg-success";
          return (
            <span className={`badge ${badgeClass} text-uppercase`}>
              {row.original.priority}
            </span>
          );
        },
      },
      {
        Header: "Assigned",
        accessor: "assigned",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.assigned ?? "No"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "assigned")
                }
                style={cellStyle}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Input>
            );
          }
          let badgeClass = '';
          if (row.original.assigned === "No") badgeClass = "bg-danger";
          if (row.original.assigned === "Yes") badgeClass = "bg-success";
          return (
            <span className={`badge ${badgeClass} text-uppercase`}>
              {row.original.assigned}
            </span>
          );
        },
      },
      {
        Header: "Responsibility",
        accessor: "responsibility",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.responsibility ?? ""}
                onChange={(e) => 
                  handleEditChange(e.target.value, "responsibility")
                }
                style={cellStyle}
                disabled={(editedRowData.taskType === "Direct" || editedRowData.taskType === "Project") && newTaskIds.includes(editableRowId)}
              >
                <option value="">Select</option>
                <option value="Vijayan">Vijayan</option>
                <option value="Purushoth">Purushoth</option>
                <option value="Nagappan">Nagappan</option>
              </Input>
            );
          }
          return <span>{row.original.responsibility}</span>
        },
      },
      {
        Header: "Proposed Target",
        accessor: "dueDate",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <div style={cellStyle}>
                <Flatpickr
                  value={new Date(editedRowData.dueDate)}
                  onChange={([date]) => {
                    handleEditChange(moment(date).format('YYYY-MM-DD'), "dueDate");
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                    minDate: "today"
                  }}
                />
              </div>
            );
          }
          return <span>{handleValidDate(row.original.dueDate)}</span>
        },
      },
      {
        Header: "Log Date",
        accessor: "logDate",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <div style={cellStyle}>
                <Flatpickr
                  value={new Date(editedRowData.logDate)}
                  onChange={([date]) => {
                    handleEditChange(moment(date).format('YYYY-MM-DD'), "logDate");
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                    minDate: new Date().fp_incr(-3),
                  }}
                />
              </div>
            );
          }
          return <span>{handleValidDate(row.original.logDate)}</span>
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.status ?? "New"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "status")
                }
                style={cellStyle}
                disabled={(editedRowData.taskType === "Direct" || editedRowData.taskType === "Project") && newTaskIds.includes(editableRowId)}
              >
                <option value="New">New</option>
                <option value="Accepted">Accepted</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
                <option value="NotCompleted">Not Completed</option>
                <option value="Removed">Removed</option>
              </Input>
            );
          }
          let badgeClass = "";
          switch (row.original.status) {
            case "Closed":
              badgeClass = "bg-success-subtle text-success";
              break;
            case "New":
              badgeClass = "bg-info-subtle text-info";
              break;
            case "Completed":
              badgeClass = "bg-success-subtle text-success";
              break;
            case "Accepted":
              badgeClass = "bg-warning-subtle text-warning";
              break;
            case "Pending":
              badgeClass = "bg-danger-subtle text-danger";
              break;
            case "Not Completed":
              badgeClass = "bg-danger-subtle text-danger";
              break;
            case "Removed":
              badgeClass = "bg-danger-subtle text-danger";
              break;
            default:
              badgeClass = "";
          }

          return (
            <span className={`badge ${badgeClass} text-uppercase`}>
              {row.original.status}
            </span>
          );
        },
      },
      {
        Header: "Status Date",
        accessor: "statusDate",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <div style={cellStyle}>
                <Flatpickr
                  value={editedRowData.statusDate ? new Date(editedRowData.statusDate) : new Date()}
                  onChange={([date]) => {
                    handleEditChange(moment(date).format('YYYY-MM-DD'), "statusDate");
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d"
                  }}
                  disabled={(editedRowData.taskType === "Direct" || editedRowData.taskType === "Project") && newTaskIds.includes(editableRowId)}
              />
              </div>
            );
          }
          return <span>{handleValidDate(row.original.statusDate)}</span>
        },
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        Cell: ({ row, column }) => {
          const isEditing = row.original.id === editableRowId;
    return isEditing ? (
      <EditableCell
        initialValue={row.values.remarks}
        row={row}
        column={column}
        updateMyData={updateMyData}
      />
    ) : (
      <>{row.values.remarks}</>
    );
        },
      },
      {
        Header: "Time Taken (Hours)",
        accessor: "timeTaken",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='number'
                value={editedRowData.timeTaken}
                onChange={(e) => 
                  handleEditChange(e.target.value, "timeTaken")
                }
                style={cellStyle}
              />
            );
          };
          return <span>{row.original.timeTaken}</span>
        },
      },
      {
        Header: "Active",
        accessor: "active",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.id === editableRowId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                type='select'
                value={editedRowData.active ?? "Active"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "active")
                }
                style={cellStyle}
                disabled={(editedRowData.taskType === "Direct" || editedRowData.taskType === "Project") && newTaskIds.includes(editableRowId)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Input>
            );
          }
          let badgeClass = '';
          if (row.original.active === "Active") badgeClass = "bg-success";
          if (row.original.active === "Inactive") badgeClass = "bg-danger";
          return (
            <span className={`badge ${badgeClass} text-uppercase`}>
              {row.original.active}
            </span>
          );
        },
      },
    ],
    [editableRowId, editedRowData, handleEditChange, updateMyData]
  );

  return (
    <React.Fragment>
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Tasks</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-danger add-btn me-1" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom me-1"></i> Import</button>
                    <button className="btn btn-danger add-btn me-1" onClick={() => { setIsEdit(false); toggle(); }}><i className="ri-add-line align-bottom me-1"></i> Export</button>
                    <button className="btn btn-danger add-btn me-1" onClick={handleCreateTask}><i className="ri-add-line align-bottom me-1"></i> Create Task</button>
                    {editableRowId && (
                      <>
                        <Button color='secondary' onClick={handleCancelClick}>Cancel</Button>
                        <Button color='primary' onClick={handleApplyClick}>Apply</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-0">
                <TableContainer
                  columns={columns}
                  data={TaskList}
                  isGlobalFilter={true}
                  updateMyData={updateMyData}
                  isAddUserList={false}
                  customPageSize={8}
                  className="custom-header-css"
                  divClass="table-responsive table-card mb-3"
                  tableClass="align-middle table-nowrap mb-0"
                  theadClass="table-light table-nowrap"
                  thClass="table-light text-muted"
                  isTaskListFilter={true}
                  SearchPlaceholder='Search for tasks or something...'
                />
            </div>
          </div>
        </Col>
      </div>

      <DeleteModal
        show={showDeleteModal}
        onDeleteClick={handleConfirmDelete}
        onCloseClick={handleCloseDeleteModal}
      />
    </React.Fragment>
  );
};

export default AllTasks;