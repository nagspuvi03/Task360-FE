import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import TableContainer from '../../../Components/Common/TableContainer';
import DeleteModal from "../../../Components/Common/DeleteModal";
import Loader from "../../../Components/Common/Loader";
import Flatpickr from "react-flatpickr";
import { Col, Input, Button } from 'reactstrap';
import { handleValidDate } from "./TaskListCol";
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import TableSkeletonLoader from '../../../Components/Common/TableSkeletonLoader';

const AllTasks = () => {
  const [TaskList, setTaskList] = useState([]);
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [originalRowData, setOriginalRowData] = useState({});
  const [editedRowData, setEditedRowData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [newTaskIds, setNewTaskIds] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [mode, setMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [plannedFinishDate, setPlannedFinishDate] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState({
    project: null,
    customer: null,
    fromDate: null,
    toDate: null,
    status: null,
    responsibility: null,
    activeFlag: null
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const usersResponse = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/auth/users');
        const projectsResponse = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/project');
        const customersResponse = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/customer');
        
        const usersData = await usersResponse.json();
        const projectsData = await projectsResponse.json();
        const customersData = await customersResponse.json();

        setUsers(usersData);
        setProjects(projectsData);
        setCustomers(customersData);
      } catch (error) {
        toast.error('Error fetching dropdown data. Please try again later', {
          style: { backgroundColor: '#FF4040', color: 'white' },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const mapStatus = (status) => {
    const statusMap = {
      'PE': 'Pending',
      'NW': 'New',
      'CP': 'Completed',
      'AC': 'Accepted',
      'CL': 'Closed',
      'NC': 'Not Completed',
      'RM': 'Removed'
    };
    return statusMap[status] || status;
  };

  const mapActive = (active) => {
    const activeMap = {
      'A': 'Active',
      'I': 'Inactive',
    };
    return activeMap[active] || active;
  };

  const onFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  const handleResetFilters = () => {
    setIsFiltered(false);
    setFilters({
      project: null,
      customer: null,
      fromDate: null,
      toDate: null,
      status: null,
      responsibility: null,
      activeFlag: null
    })
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://task360.osc-fr1.scalingo.io/task-360/api/v1/task/getTasks?page=${currentPage}&pageSize=${pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project: filters.project,
          customer: filters.customer,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          status: filters.status,
          responsibility: filters.responsibility,
          activeFlag: filters.active
        }),
      });
      if (response.ok) {
        const filterFlag = response.headers.get('Filter-Flag');
        console.log(filterFlag);
        setIsFiltered(filterFlag === 'Y');
        const data = await response.json();
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setNumberOfElements(data.numberOfElements);
        const mappedTasks = data.content.map(task => ({
          ...task,
          taskType: task.type ? (task.type === 'D' ? 'Direct' : 'Project') : null,
          status: mapStatus(task.status),
          active: mapActive(task.active),
          project: task.projectNumber,
          function: task.functionArea,
          task: task.taskDescription,
          assigned: task.assignedYn,
          dueDate: task.proposedTarget
        }));
        setTaskList(mappedTasks);
      } else {
        toast.error('Failed to fetch tasks', {
          style: { backgroundColor: '#FF4040', color: 'white' },
        });
      }
    } catch (error) {
      toast.error('Failed to fetch tasks', {
        style: { backgroundColor: '#FF4040', color: 'white' },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, pageSize, filters, isFiltered]);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const updateMyData = (id, columnId, value) => {
    setTaskList(old =>
      old.map((row) => {
        if (row.taskId === id) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const EditableCell = ({
    initialValue,
    taskId,
    column,
    updateMyData,
  }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = e => {
      setValue(e.target.value);
    };

    const onBlur = () => {
      updateMyData(taskId, column.id, value);
      console.log(`onBlur: Committing ${column.id} = ${value}`);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <Input value={value || ''} onChange={onChange} onBlur={onBlur} />;
  };

  const getDefaultDueDate = (taskType, projectEndDate) => {
    const today = moment().startOf('day');
    const defaultDateForDirect = today.clone().add(3, 'days');
    let maxDateForDirect = today.clone().add(50, 'days').endOf('day');

    let defaultDate = defaultDateForDirect;
    let maxDate = maxDateForDirect;

    if(taskType === "Project" && projectEndDate) {
      const projectFinishMoment = moment(projectEndDate);
      maxDate = projectFinishMoment.endOf('day');
      if (projectFinishMoment.isBefore(defaultDateForDirect)) {
        defaultDate = projectFinishMoment;
      }
    }

    return {
      defaultDate: defaultDate.toDate(),
      minDate: today.toDate(),
      maxDate: maxDate.toDate()
    };
  };

  const handleCreateTask = () => {
    setIsCreatingTask(true);
    const newTaskId = `new_${Date.now()}`;
    const { defaultDate } = getDefaultDueDate("Direct");

    const newTask = {
      id: newTaskId,
      taskId: newTaskId,
      taskType: "Direct",
      project: "",
      customer: "",
      function: "",
      task: "",
      priority: "A",
      assigned: "No",
      responsibility: "",
      dueDate: defaultDate,
      logDate: moment().format('YYYY-MM-DD'),
      status: "New",
      statusDate: moment().format('YYYY-MM-DD'),
      remarks: "",
      timeTaken: "",
      active: "Active",
      createdAt: new Date().toISOString(),
    };
    setTaskList(prevTaskList => [newTask, ...prevTaskList]);
    setEditableTaskId(newTaskId);
    setNewTaskIds(prevNewTaskIds => [...prevNewTaskIds, newTaskId]);
    setEditedRowData(newTask);
    setMode('create');
  };

  const handleEditClick = (taskData) => {
    setEditableTaskId(taskData.taskId);
    setOriginalRowData(taskData);

    setEditedRowData({
      ...taskData,
      dueDate: taskData.dueDate, 
      logDate: taskData.logDate, 
      statusDate: taskData.statusDate,
    });
    setMode('edit');
  };

  const handleCancelClick = () => {
    setValidationErrors({});
    setTriggerAnimation(false);
    if (newTaskIds.includes(editableTaskId)) {
      setTaskList(TaskList.filter(task => task.taskId !== editableTaskId));
      setNewTaskIds(newTaskIds.filter(id => id !== editableTaskId));
    } else {
      setTaskList(prevTaskList =>
        prevTaskList.map(task =>
          task.taskId === editableTaskId ? originalRowData : task
        )
      );
    }
    setEditableTaskId(null);
    setEditedRowData({});
    setIsCreatingTask(false);
    setMode(null);
    scrollToCheckbox();
  };

  const mapStatusToCode = (status) => {
    const statusMap = {
        'Pending': 'PE',
        'New': 'NW',
        'Completed': 'CP',
        'Accepted': 'AC',
        'Closed': 'CL',
        'Not Completed': 'NC',
        'Removed': 'RM',
    };
    return statusMap[status] || status;
  };

  const mapActiveToCode = (active) => {
    const activeMap = {
        'Active': 'A',
        'Inactive': 'I',
    };
    return activeMap[active] || active;
  };

  const handleApplyClick = async () => {
    if (validateFields()) {
      setLoading(true);

      const effectiveLogDate = editedRowData.logDate
        ? moment(editedRowData.logDate).format('YYYY-MM-DD') + 'T00:00:00.000'
        : "";

      const formattedDueDate = moment(editedRowData.dueDate).format('YYYY-MM-DD');

      const taskData = {
          type: editedRowData.taskType === 'Direct' ? 'D' : 'P',
          projectNumber: editedRowData.project ? editedRowData.project : null,
          customer: editedRowData.customer,
          functionArea: editedRowData.function,
          taskDescription: editedRowData.task,
          priority: editedRowData.priority,
          assignedYn: editedRowData.assigned,
          responsibility: editedRowData.responsibility ? editedRowData.responsibility : null,
          proposedTarget: formattedDueDate,
          targetDate: formattedDueDate,
          status: mapStatusToCode(editedRowData.status),
          active: mapActiveToCode(editedRowData.active),
          logDate: effectiveLogDate,
          statusDate: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
          remarks: editedRowData.remarks,
          timeTaken: editedRowData.timeTaken,
          dateCreated: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
          createdUser: sessionStorage.getItem('userId'),
          dateModified: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
          modifiedUser: sessionStorage.getItem('userId'),
          dateClosed: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
          dateRemoved: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
      };
      try {
        const response = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/task', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify([taskData]),
        });
        const data = await response.json();
        if (data.returnCode === 0) {
          await fetchTasks();
          toast.success('Task created successfully', {
            style: { backgroundColor: '#4BB543', color: 'white' },
          });
        } else {
          toast.error('Task creation failed', {
            style: { backgroundColor: '#FF4040', color: 'white' },
          });
        }
      } catch (error) {
        toast.error('Task creation failed', {
          style: { backgroundColor: '#FF4040', color: 'white' },
        });
      } finally {
        fetchTasks();
        setLoading(false);
      }

      setValidationErrors({});
      setTriggerAnimation(false);
      setEditableTaskId(null);
      setEditedRowData({});
      setIsCreatingTask(false);
      setNewTaskIds(prevIds => prevIds.filter(id => id !== editableTaskId));
      scrollToCheckbox();
      setMode(null);
    } else {
      setTriggerAnimation(!triggerAnimation);
      scrollToFirstError();
      return;
    }
  };

  const handleUpdateClick = async () => {
    if (validateEditFields()) {
      setLoading(true);
      setValidationErrors({});
      setTriggerAnimation(false);

      const logDateWasModified = editedRowData.logDate !== originalRowData.logDate;

      const effectiveLogDate = logDateWasModified
        ? moment(editedRowData.logDate).format('YYYY-MM-DD') + 'T00:00:00.000'
        : originalRowData.logDate;

      const statusWasModified = editedRowData.status !== originalRowData.status;

      const effectiveStatusDate = statusWasModified
        ? moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS')
        : originalRowData.statusDate;

      const updatedTaskData = {
        taskId: editableTaskId,
        type: editedRowData.taskType === 'Direct' ? 'D' : 'P',
        projectNumber: editedRowData.project ? editedRowData.project : null,
        customer: editedRowData.customer,
        functionArea: editedRowData.function,
        taskDescription: editedRowData.task,
        priority: editedRowData.priority,
        assignedYn: editedRowData.assigned,
        responsibility: editedRowData.responsibility ? editedRowData.responsibility : null,
        proposedTarget: editedRowData.dueDate,
        targetDate: editedRowData.dueDate,
        status: mapStatusToCode(editedRowData.status),
        active: mapActiveToCode(editedRowData.active),
        logDate: effectiveLogDate,
        statusDate: effectiveStatusDate,
        remarks: editedRowData.remarks,
        timeTaken: editedRowData.timeTaken,
        dateCreated: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
        createdUser: sessionStorage.getItem('userId'),
        dateModified: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
        modifiedUser: sessionStorage.getItem('userId'),
        dateClosed: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
        dateRemoved: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
      }

      try {
        const response = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/task', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([updatedTaskData]),
        });
        const data = await response.json();
        if (data.returnCode === 0) {
          await fetchTasks();
          toast.success('Task updated successfully', {
            style: { backgroundColor: '#4BB543', color: 'white' },
          });
        } else {
          toast.error('Task updation failed', {
            style: { backgroundColor: '#FF4040', color: 'white' },
          });
        }
      } catch (error) {
        toast.error('Task updation failed', {
          style: { backgroundColor: '#FF4040', color: 'white' },
        });
      } finally {
        fetchTasks();
        setLoading(false);
      }

      setEditableTaskId(null);
      setEditedRowData({});
      setIsCreatingTask(false);
      setNewTaskIds(prevIds => prevIds.filter(id => id !== editableTaskId));
      setMode(null);
    } else {
      setTriggerAnimation(!triggerAnimation);
      scrollToFirstError();
      return;
    }
  };

  const handleEditChange = (value, accessor) => {
    if(['dueDate', 'logDate', 'statusDate'].includes(accessor)) {
      value = moment(value).format('YYYY-MM-DD');
    }

    let updatedData = { ...editedRowData, [accessor]: value };
    
    if (accessor === "taskType") {
      const dates = getDefaultDueDate(value);
      
      updatedData = {
        ...updatedData,
        dueDate: dates.defaultDate,
        plannedFinishDate: value === "Project" ? null : dates.maxDate,
      };

      if (value === "Direct") {
        updatedData.project = "";
        updatedData.responsibility = "";
        updatedData.status = "New";
        updatedData.statusDate = moment().format('YYYY-MM-DD');
        updatedData.active = "Active";
      } else if (value === "Project") {
        updatedData.responsibility = "";
        updatedData.status = "New";
        updatedData.statusDate = moment().format('YYYY-MM-DD');
        updatedData.active = "Active";
      }
    } else if(accessor === "project") {
      handleProjectChange(value);
    }

    if (accessor === "status") {
      if (value === originalRowData.status) {
        updatedData.statusDate = originalRowData.statusDate;
      } else {
        updatedData.statusDate = moment().format('YYYY-MM-DD');
      }
    }

    setEditedRowData(updatedData);

    if (accessor === "assigned") {
      if (value === "No") {
        updatedData = { ...updatedData, responsibility: "" };
        setEditedRowData(updatedData);
        setValidationErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors.responsibility;
          return newErrors;
        });
      }
    } else if (accessor === "responsibility" && value !== "") {
      setValidationErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[accessor];
        return newErrors;
      });
    }

    if (value === "" || (accessor === "responsibility" && updatedData.assigned === "Yes" && value === "")) {
      setValidationErrors(prevErrors => ({ ...prevErrors, [accessor]: true }));
    } else {
      setValidationErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[accessor];
        return newErrors;
      });
    }

    if (accessor === "taskType") {
      if (value === "Direct") {
        updatedData = { ...updatedData, project: "" };
        setEditedRowData(updatedData);
        setSelectedCustomerId("");
        setValidationErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors.project;
          return newErrors;
        });
      }
    } else if (accessor === "project" && value !== "") {
      setValidationErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[accessor];
        return newErrors;
      });
    } else if(accessor === "customer") {
      setSelectedCustomerId(value);
    }

    if (value === "" || (accessor === "project" && updatedData.taskType === "Project" && value === "")) {
      setValidationErrors(prevErrors => ({ ...prevErrors, [accessor]: true }));
    } else {
      setValidationErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[accessor];
        return newErrors;
      });
    }
  };

  const handleProjectChange = async (projectNumber) => {
    setSelectedProject(projectNumber);
    const projectUrl = `https://task360.osc-fr1.scalingo.io/task-360/api/v1/project/${projectNumber}`;
    try {
      const response = await fetch(projectUrl);
      const data = await response.json();
      const projectId = data[0]?.customerId;
      const projectEndDate = data[0]?.plannedFinishDate;
      setSelectedCustomerId(projectId);
      setPlannedFinishDate(projectEndDate);

      const { defaultDate, maxDate } = getDefaultDueDate("Project", projectEndDate);
      setEditedRowData(prevData => ({
        ...prevData,
        dueDate: defaultDate,
        plannedFinishDate: maxDate
      }));
    } catch (error) {
      toast.error('Failed to fetch project details', {
        style: { backgroundColor: '#FF4040', color: 'white' },
      });
    }
  };

  const handleDeleteClick = (taskId) => {
    setShowDeleteModal(true);
    setTaskToDelete([taskId]);
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  }

  const handleConfirmDelete = async () => {
    if (taskToDelete && taskToDelete.length > 0) {
      const deleteRequestBody = taskToDelete.map(taskId => {
        const task = TaskList.find(t => t.taskId === taskId);
        const status = mapStatusToCode(task.status);
        return { taskId, status };
      });
      setLoading(true);
      try {
        const response = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/task', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deleteRequestBody),
        });
        const data = await response.json();
        if (data.returnCode === 0) {
          await fetchTasks();
          toast.success('Task deleted successfully', {
            style: { backgroundColor: '#4BB543', color: 'white' },
          });
        } else {
          toast.error('Task deletion failed', {
            style: { backgroundColor: '#FF4040', color: 'white' },
          });
        }
      } catch (error) {
        toast.error('Task deletion failed', {
          style: { backgroundColor: '#FF4040', color: 'white' },
        });
      } finally {
        fetchTasks();
        setLoading(false);
      }
      setShowDeleteModal(false);
      clearSelection();
      setSelectedRowIds({});
      setEditableTaskId(null);
      setEditedRowData({});
    }
  };

  const handleSelectRow = (taskId) => {
    setSelectedRowIds(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const triggerDeleteModal = () => {
    const selectedIds = Object.keys(selectedRowIds).filter(id => selectedRowIds[id]);
    setShowDeleteModal(true);
    setTaskToDelete(selectedIds);
  };

  const clearSelection = () => {
    setSelectedRowIds({});
    setEditableTaskId(null);
    setEditedRowData({});
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      const allIds = TaskList.map(task => task.taskId);
      setSelectedRowIds(allIds.reduce((acc, id) => ({ ...acc, [id]: true }), {}));
    } else {
      setSelectedRowIds({});
    }
  };

  const validateFields = () => {
    let errors = {};
    let isValid = true;

    if (!editedRowData.taskType) {
      errors.taskType = true;
      isValid = false;
    }
    if (editedRowData.taskType === 'Project' && !editedRowData.project) {
      errors.project = true;
      isValid = false;
    }
    if (!editedRowData.task || editedRowData.task.trim() === '') {
      errors.task = true;
      isValid = false;
    }
    if (!editedRowData.function) {
      errors.function = true;
      isValid = false;
    }
    if (!editedRowData.priority) {
      errors.priority = true;
      isValid = false;
    }
    if (!editedRowData.assigned) {
      errors.assigned = true;
      isValid = false;
    }
    if (editedRowData.assigned === 'Yes' && !editedRowData.responsibility) {
      errors.responsibility = true;
      isValid = false;
    }
    if (!editedRowData.dueDate) {
      errors.dueDate = true;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const validateEditFields = () => {
    let errors = {};
    let isValid = true;

    if (!editedRowData.taskType) {
      errors.taskType = true;
      isValid = false;
    }
    if (editedRowData.taskType === 'Project' && !editedRowData.project) {
      errors.project = true;
      isValid = false;
    }
    if (!editedRowData.task || editedRowData.task.trim() === '') {
      errors.task = true;
      isValid = false;
    }
    if (!editedRowData.function) {
      errors.function = true;
      isValid = false;
    }
    if (!editedRowData.priority) {
      errors.priority = true;
      isValid = false;
    }
    if (!editedRowData.assigned) {
      errors.assigned = true;
      isValid = false;
    }
    if (editedRowData.assigned === 'Yes' && !editedRowData.responsibility) {
      errors.responsibility = true;
      isValid = false;
    }
    if (!editedRowData.remarks || editedRowData.remarks.trim() === '') {
      errors.remarks = true;
      isValid = false;
    }
    const timeTakenValue = parseFloat(editedRowData.timeTaken.replace(/\s+/g, ''));
    if (!editedRowData.timeTaken || editedRowData.timeTaken.includes(" ") || timeTakenValue <= 0) {
      errors.timeTaken = true;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const scrollToFirstError = () => {
    const fieldOrder = ['taskType', 'project', 'customer', 'function', 'task', 'priority', 'assigned', 'responsibility', 'dueDate', 'logDate', 'taskStatus', 'statusDate', 'remarks', 'timeTaken', 'active'];
    
    for (let field of fieldOrder) {
      if (validationErrors[field]) {
        const element = document.getElementById(field);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    }
  };

  const scrollToCheckbox = () => {
    const firstCheckbox = document.querySelector('.table tbody tr:first-child td:first-child input[type="checkbox"]');
    if (firstCheckbox) {
      firstCheckbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
        scrollToFirstError();
    }
  }, [validationErrors]);

  const errorStyle = {
    border: '1px solid red',
  };

  const errorAnimation = `
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
      100% { transform: translateX(0); }
    }
  `;

  const getCellStyle = (isEditing) => {
    return isEditing ? { minWidth: '150px' } : {};
  };

  const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <Input type="checkbox" ref={resolvedRef} {...rest} />
    );
  });

  const isCreateOrEditMode = editableTaskId !== null || newTaskIds.length > 0;

  const columns = useMemo(() => {
    let baseColumns = [
      {
        Header: () => (
          sessionStorage.getItem('userRole') !== 'PM' && (
            <IndeterminateCheckbox
              indeterminate={Object.keys(selectedRowIds).length > 0 && Object.keys(selectedRowIds).length < TaskList.length}
              checked={Object.keys(selectedRowIds).length === TaskList.length}
              onChange={handleSelectAllChange}
              disabled={isCreateOrEditMode}
            />
          )
        ),
        id: 'selection',
        Cell: ({ row }) => (
          sessionStorage.getItem('userRole') !== 'PM' && (
            <IndeterminateCheckbox
              checked={selectedRowIds[row.original.taskId] === true}
              onChange={() => handleSelectRow(row.original.taskId)}
              disabled={isCreateOrEditMode}
            />
          )
        ),
      },
      {
        Header: "Task Type",
        accessor: "taskType",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='taskType'
                type='select'
                value={editedRowData.taskType ?? "Direct"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "taskType")
                }
                style={{
                  ...cellStyle,
                  ...(validationErrors.taskType && errorStyle),
                  animation: validationErrors.taskType ? 'shake 0.5s' : 'none'
                }}
                key={`task-${triggerAnimation}`}
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='project'
                type='select'
                value={editedRowData.project ?? ""}
                onChange={(e) => {
                  handleProjectChange(e.target.value);
                  handleEditChange(e.target.value, "project")
                }}
                style={{
                  ...cellStyle,
                  ...(validationErrors.project && errorStyle),
                  animation: validationErrors.project ? 'shake 0.5s' : 'none'
                }}
                disabled={editedRowData.taskType !== "Project"}
              >
                <option value="">Select</option>
                {projects.map((project) => (
                  <option key={project.projectNumber} value={project.projectNumber}>{project.projectName}</option>
                ))}
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='customer'
                type='select'
                value={selectedCustomerId ?? ""}
                onChange={(e) => 
                  handleEditChange(e.target.value, "customer")
                }
                disabled={editedRowData.taskType === "Project" && !!editedRowData.project}
                style={cellStyle}
              >
                <option value="">Select</option>
                {customers.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>{customer.customerName}</option>
                ))}
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='function'
                type='select'
                value={editedRowData.function ?? ""}
                onChange={(e) => 
                  handleEditChange(e.target.value, "function")
                }
                style={{
                  ...cellStyle,
                  ...(validationErrors.function && errorStyle),
                  animation: validationErrors.function ? 'shake 0.5s' : 'none'
                }}
                key={`task-${triggerAnimation}`}
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
          const isEditing = row.original.taskId === editableTaskId;
          const { status } = row.original;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='task'
                type='text'
                value={editedRowData.task}
                onChange={(e) => 
                  handleEditChange(e.target.value, "task")
                }
                style={{
                  ...cellStyle,
                  ...(validationErrors.task && errorStyle),
                  animation: validationErrors.task ? 'shake 0.5s' : 'none'
                }}
                key={`task-${triggerAnimation}`}
              />
            );
          };
          
          const isEditableStatus = !["Completed", "Closed", "Removed"].includes(status);

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
                  {isEditableStatus && (
                    <li className="list-inline-item">
                      <Link to="#" onClick={() => handleEditClick(row.original)}>
                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                      </Link>
                    </li>
                  )}
                  {sessionStorage.getItem('userRole') !== 'PM' && (
                    <li className="list-inline-item">
                      <Link to="#" className="remove-item-btn" onClick={() => handleDeleteClick(row.original.taskId)}>
                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                      </Link>
                    </li>
                  )}
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='priority'
                type='select'
                value={editedRowData.priority ?? "A"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "priority")
                }
                style={{
                  ...cellStyle,
                  ...(validationErrors.priority && errorStyle),
                  animation: validationErrors.priority ? 'shake 0.5s' : 'none'
                }}
                key={`task-${triggerAnimation}`}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Input>
            );
          }
          let badgeClass = '';
          if (row.original.priority === "A") badgeClass = "bg-danger";
          if (row.original.priority === "B") badgeClass = "bg-warning";
          if (row.original.priority === "C") badgeClass = "bg-success";
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='assigned'
                type='select'
                value={editedRowData.assigned ?? "No"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "assigned")
                }
                style={{
                  ...cellStyle,
                  ...(validationErrors.assigned && errorStyle),
                  animation: validationErrors.assigned ? 'shake 0.5s' : 'none'
                }}
                key={`task-${triggerAnimation}`}
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='responsibility'
                type='select'
                value={editedRowData.responsibility ?? ""}
                onChange={(e) => 
                  handleEditChange(e.target.value, "responsibility")
                }
                style={{
                  ...cellStyle,
                  ...(validationErrors.responsibility && errorStyle),
                  animation: validationErrors.responsibility ? 'shake 0.5s' : 'none'
                }}
                key={`task-${triggerAnimation}`}
                disabled={editedRowData.assigned !== "Yes"}
              >
                <option value="">Select</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>{user.userName}</option>
                ))}
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          const taskType = editedRowData.taskType || "Direct";
          const { minDate, maxDate } = getDefaultDueDate(editedRowData.taskType, plannedFinishDate);
          if(isEditing) {
            return (
              <div style={{
                  ...cellStyle,
                  ...(validationErrors.dueDate && errorStyle),
                  animation: validationErrors.dueDate ? 'shake 0.5s' : 'none'
                }}>
                <Flatpickr
                  id='dueDate'
                  value={editedRowData.dueDate ? new Date(editedRowData.dueDate) : null}
                  onChange={([date]) => {
                    handleEditChange(moment(date).format('YYYY-MM-DD'), "dueDate");
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                    minDate: minDate,
                    maxDate: maxDate
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            console.log(editedRowData.logDate);
            return (
              <div style={cellStyle}>
                <Flatpickr
                  id='logDate'
                  value={editedRowData.logDate ? editedRowData.logDate : null}
                  onChange={([date]) => {
                    handleEditChange(moment(date).format('YYYY-MM-DD'), "logDate");
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                    minDate: new Date().fp_incr(-3),
                    maxDate: new Date()
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='taskStatus'
                type='select'
                value={editedRowData.status ?? "New"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "status")
                }
                style={cellStyle}
                disabled={(editedRowData.taskType === "Direct" || editedRowData.taskType === "Project") && newTaskIds.includes(editableTaskId)}
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
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <div style={cellStyle}>
                <Flatpickr
                  id='statusDate'
                  value={editedRowData.statusDate ? new Date(editedRowData.statusDate) : null}
                  onChange={([date]) => {
                    handleEditChange(moment(date).format('YYYY-MM-DD'), "statusDate");
                  }}
                  options={{
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d"
                  }}
                  disabled
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
        Cell: ({ row }) => {
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='remarks'
                type='text'
                value={editedRowData.remarks}
                onChange={(e) => 
                  handleEditChange(e.target.value, "remarks")
                }
                style={{
                  ...cellStyle,
                  ...(validationErrors.remarks && errorStyle),
                  animation: validationErrors.remarks ? 'shake 0.5s' : 'none'
                }}
              />
            );
          };
          return <span>{row.original.remarks}</span>
        },
      },
      {
        Header: "Time Taken (Hours)",
        accessor: "timeTaken",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='timeTaken'
                type='number'
                value={editedRowData.timeTaken}
                onChange={(e) => 
                  handleEditChange(e.target.value, "timeTaken")
                }
                disabled={mode === 'create'}
                style={{
                  ...cellStyle,
                  ...(validationErrors.timeTaken && errorStyle),
                  animation: validationErrors.taskType ? 'shake 0.5s' : 'none'
                }}
              />
            );
          };
          return <span>{row.original.timeTaken}</span>
        },
      },
    ];

    if (!isCreatingTask) {
      baseColumns.push({
        Header: "Active",
        accessor: "active",
        filterable: false,
        Cell: ({ row }) => {
          const isEditing = row.original.taskId === editableTaskId;
          const cellStyle = getCellStyle(isEditing);
          if(isEditing) {
            return (
              <Input
                id='active'
                type='select'
                value={editedRowData.active ?? "Active"}
                onChange={(e) => 
                  handleEditChange(e.target.value, "active")
                }
                style={cellStyle}
                disabled
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
        }
      });
    }
    return baseColumns;
  }, [editableTaskId, editedRowData, handleEditChange, updateMyData, isCreatingTask]);

  return (
    <React.Fragment>
      <style>
        {errorAnimation}
      </style>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark' />
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Tasks</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    {TaskList.length > 0 && isFiltered && (
                      <Button color='danger' onClick={handleResetFilters}>
                        Reset Filter(s)
                      </Button>
                    )}
                    {Object.keys(selectedRowIds).length > 0 ? (
                      <>
                        <Button color='danger' onClick={triggerDeleteModal}>Delete</Button>
                        <Button color='secondary' onClick={clearSelection}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        {!isCreatingTask && !editableTaskId && !isFiltered && (
                          <button className="btn btn-danger add-btn me-1" onClick={() => {}}><i className="ri-add-line align-bottom me-1"></i> Import</button>
                        )}
                        {TaskList.length > 0 && !isCreatingTask && !editableTaskId && !isFiltered && (
                          <button className="btn btn-danger add-btn me-1" onClick={() => {}}><i className="ri-add-line align-bottom me-1"></i> Export</button>
                        )}
                        {!isCreatingTask && !editableTaskId && TaskList.length > 0 && (
                          <button className="btn btn-danger add-btn me-1" onClick={handleCreateTask}><i className="ri-add-line align-bottom me-1"></i> Create Task</button>
                        )}
                      </>
                    )}
                    {(isCreatingTask || editableTaskId) && (
                      <>
                        <Button color='secondary' onClick={handleCancelClick}>Cancel</Button>
                        {
                          mode === 'create' && (
                            <Button color='primary' onClick={handleApplyClick}>Apply</Button>
                          )
                        }
                        {
                          mode === 'edit' && (
                            <Button color='primary' onClick={handleUpdateClick}>Update</Button>
                          )
                        }
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {!loading ? (
              TaskList.length > 0 ? (
                <div className="card-body pt-0">
                  <TableContainer
                    columns={columns}
                    data={TaskList}
                    isGlobalFilter={true}
                    defaultSortBy={{ id: 'createdAt', desc: true }}
                    isAddUserList={false}
                    className="custom-header-css"
                    divClass="table-responsive table-card mb-3"
                    tableClass="align-middle table-nowrap mb-0"
                    theadClass="table-light table-nowrap"
                    thClass="table-light text-muted"
                    isTaskListFilter={true}
                    SearchPlaceholder='Search for tasks or something...'
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    customPageSize={pageSize}
                    totalElements={totalElements}
                    numberOfElements={numberOfElements}
                    onFilterChange={onFilterChange}
                  />
                </div>
            ) : (
                <div className="card-body text-center">
                  {isFiltered ? (
                    <>
                      <h5>No Tasks Found for the selected filter criteria.</h5>
                      <Button color='danger' onClick={handleResetFilters}>
                        Reset Filter(s)
                      </Button>
                    </>
                  ) : (
                    <>
                      <h5>No Tasks Found</h5>
                      <p>Click on "Create Task" to add new tasks.</p>
                      <button className="btn btn-danger add-btn" onClick={handleCreateTask}>
                        <i className="ri-add-line align-bottom me-1"></i> Create Task
                      </button>
                    </>
                  )}
                </div>
            ) 
          ) : (
            <div className="card-body text-center">
              <TableSkeletonLoader />
            </div>
          )}
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