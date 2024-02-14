import React, { useState, useEffect } from 'react';
import Flatpickr from "react-flatpickr";

const TaskListGlobalFilter = ({ onFilterChange }) => {
    const [dateRange, setDateRange] = useState('');
    const [status, setStatus] = useState('');
    const [project, setProject] = useState('');
    const [customer, setCustomer] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [active, setActive] = useState('');
    const [isFilterChanged, setIsFilterChanged] = useState(false);
    const [projectDropdownData, setProjectDropdownData] = useState([]);
    const [customerDropdownData, setCustomerDropdownData] = useState([]);
    const [responsibilityDropdownData, setResponsibilityDropdownData] = useState([]);

    useEffect(() => {
        const fetchDropdownData = async () => {
        try {
            const usersResponse = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/auth/users');
            const projectsResponse = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/project');
            const customersResponse = await fetch('https://task360.osc-fr1.scalingo.io/task-360/api/v1/customer');
            
            const usersData = await usersResponse.json();
            const projectsData = await projectsResponse.json();
            const customersData = await customersResponse.json();

            setResponsibilityDropdownData(usersData);
            setProjectDropdownData(projectsData);
            setCustomerDropdownData(customersData);
        } catch (error) {
        }
        };

        fetchDropdownData();
    }, []);

    useEffect(() => {
        if (dateRange !== '' || status || project || customer || responsibility || active) {
            setIsFilterChanged(true);
        } else {
            setIsFilterChanged(false);
        }
    }, [dateRange, status, project, customer, responsibility, active]);

    const handleDateRangeChange = (selectedDates) => {
        if (selectedDates.length === 2) {
            setDateRange(selectedDates.map(date => date.toISOString()).join(' to '));
        } else {
            setDateRange('');
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleProjectChange = (e) => {
        setProject(e.target.value);
    }

    const handleCustomerChange = (e) => {
        setCustomer(e.target.value);
    }

    const handleResponsibilityChange = (e) => {
        setResponsibility(e.target.value);
    }

    const handleActiveChange = (e) => {
        setActive(e.target.value);
    }

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
            'Inactive': 'I',
        };
        return activeMap[active] || active;
    };

    const handleApplyFilters = () => {
        const filterValues = {
            fromDate: dateRange ? dateRange.split(' to ')[0]: null,
            toDate: dateRange ? dateRange.split(' to ')[1] : null,
            status: status ? mapStatusToCode(status) : null,
            project: project ? project : null,
            customer : customer ? customer : null,
            responsibility : responsibility ? responsibility : null,
            active: active ? mapActiveToCode(active) : null
        };
        onFilterChange(filterValues);
    };

    return (
        <React.Fragment>
            <div className="col-sm-auto">
                <Flatpickr
                    placeholder="Select date range"
                    className="form-control bg-light border-light"
                    options={{
                        mode: "range",
                        dateFormat: "d M, Y"
                    }}
                    onChange={handleDateRangeChange}
                />
            </div>

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="status" id="idStatus" onChange={handleStatusChange}>
                        <option value="">Status</option>
                        <option value="New">New</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Closed">Closed</option>
                        <option value="NotCompleted">Not Completed</option>
                        <option value="Removed">Removed</option>
                    </select>
                </div>
            </div>

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="projects" id="idProjects" onChange={handleProjectChange}>
                        <option value="">Projects</option>
                        {projectDropdownData.map((project) => (
                            <option key={project.projectNumber} value={project.projectNumber}>{project.projectName}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="customers" id="idCustomers" onChange={handleCustomerChange}>
                        <option value="">Customers</option>
                        {customerDropdownData.map((customer) => (
                            <option key={customer.customerId} value={customer.customerId}>{customer.customerName}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="responsibility" id="idResponsibility" onChange={handleResponsibilityChange}>
                        <option value="">Responsibility</option>
                        {responsibilityDropdownData.map((user) => (
                            <option key={user.userId} value={user.userId}>{user.userName}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="active" id="idActive" onChange={handleActiveChange}>
                        <option value="">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="col-sm-auto">
                <button type="button" className="btn btn-primary w-100" disabled={!isFilterChanged} onClick={handleApplyFilters}> <i className="ri-equalizer-fill me-1 align-bottom"></i>
                    Apply Filter(s)
                </button>
            </div>
        </React.Fragment>
    );
};

export default TaskListGlobalFilter;