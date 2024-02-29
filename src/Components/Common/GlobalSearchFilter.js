import React, { useState, useEffect } from 'react';
import Flatpickr from "react-flatpickr";
import moment from 'moment';

const TaskListGlobalFilter = ({ onFilterChange, filterValues, users, projects, customers }) => {
    const userRole = sessionStorage.getItem('userRole');
    const [dateRange, setDateRange] = useState('');
    const [status, setStatus] = useState('');
    const [project, setProject] = useState('');
    const [customer, setCustomer] = useState('');
    const [responsibility, setResponsibility] = useState('');
    const [active, setActive] = useState('');
    const [isFilterChanged, setIsFilterChanged] = useState(false);

    useEffect(() => {
        if (dateRange !== '' || status || project || customer || responsibility || active) {
            setIsFilterChanged(true);
        } else {
            setIsFilterChanged(false);
        }
    }, [dateRange, status, project, customer, responsibility, active]);

    const handleDateRangeChange = (selectedDates) => {
        if (selectedDates.length === 2) {
            const startDate = moment(selectedDates[0]).format('YYYY-MM-DD');
            const endDate = moment(selectedDates[1]).format('YYYY-MM-DD');
            setDateRange([startDate, endDate].join(' to '));
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

    const handleApplyFilters = () => {
        const filterValues = {
            fromDate: dateRange ? dateRange.split(' to ')[0]: null,
            toDate: dateRange ? dateRange.split(' to ')[1] : null,
            status: status ? status : null,
            project: project ? project : null,
            customer : customer ? customer : null,
            responsibility : responsibility ? responsibility : null,
            active: active ? active : null
        };
        onFilterChange(filterValues);
    };

    const mapStatusToLabel = (status) => {
        const statusMap = {
            'NW': 'New',
            'AC': 'Accepted',
            'PE': 'Pending',
            'CP': 'Completed',
            'CL': 'Closed',
            'NC': 'Not Completed',
            'RM': 'Removed',
        };
        return statusMap[status] || status;
    };

    const mapActiveFlagToLabel = (activeFlag) => {
        const activeFlagMap = {
            'A': 'Active',
            'I': 'Inactive',
        };
        return activeFlagMap[activeFlag] || activeFlag;
    };

    const getLabel = (key) => {
        const labelsMap = {
            'project': 'Projects',
            'customer': 'Customers',
            'fromDate': 'Date Range',
            'toDate': '',
            'status': 'Status',
            'responsibility': 'Responsibility',
            'activeFlag': 'Active',
        };
        return labelsMap[key];
    };

    const getValueLabel = (key, value) => {
        if (key === 'project') {
            return projects.find(p => p.projectNumber === value)?.projectName || value;
        }
        if (key === 'customer') {
            return customers.find(c => c.customerId == value)?.customerName || value;
        }
        if (key === 'responsibility') {
            return users.find(u => u.userId === value)?.userName || value;
        }
        if (key === 'status') {
            return mapStatusToLabel(value);
        }
        if (key === 'activeFlag') {
            return mapActiveFlagToLabel(value);
        }
        return value;
    };

    const renderFilterPills = () => {
        const pillContainerStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '1rem'
        };

        const pillStyle = {
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'lightblue',
            borderRadius: '20px',
            padding: '0.25rem 0.75rem',
            fontSize: '0.875rem',
            color: '#333',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            margin: '0.25rem'
        };

        const pillLabelStyle = {
            fontWeight: 'bold',
            marginRight: '0.5rem'
        };

        const pillValueStyle = {
            marginRight: '0.5rem'
        };

        const filterPills = Object.entries(filterValues).map(([key, value]) => {
            if (!value || key === 'fromDate' || key === 'toDate') return null;

            const label = getLabel(key);
            const displayValue = getValueLabel(key, value);

            return (
                <span key={key} style={pillStyle}>
                    <span style={pillLabelStyle}>{label}:</span>
                    <span style={pillValueStyle}>{displayValue}</span>
                </span>
            );
        });

        if (filterValues.fromDate && filterValues.toDate) {
            const dateRangeLabel = getLabel('fromDate');
            const displayValue = `${getValueLabel('fromDate', moment(filterValues.fromDate).format('DD MMM YYYY'))} to ${getValueLabel('toDate', moment(filterValues.toDate).format('DD MMM YYYY'))}`;

            filterPills.push(
                <span key="dateRange" style={pillStyle}>
                    <span style={pillLabelStyle}>{dateRangeLabel}:</span>
                    <span style={pillValueStyle}>{displayValue}</span>
                </span>
            );
        }

        return <div style={pillContainerStyle}>{filterPills}</div>;
    };

    return (
        <React.Fragment>
            <div className="col-sm-auto">
                <Flatpickr
                    placeholder="Select date range"
                    className="form-control bg-light border-light"
                    options={{
                        mode: "range",
                        dateFormat: "Y-m-d"
                    }}
                    onChange={handleDateRangeChange}
                />
            </div>

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="status" id="idStatus" onChange={handleStatusChange}>
                        <option value="">Status</option>
                        <option value="NW">New</option>
                        <option value="AC">Accepted</option>
                        <option value="PE">Pending</option>
                        <option value="CP">Completed</option>
                        <option value="CL">Closed</option>
                        <option value="NC">Not Completed</option>
                        <option value="RM">Removed</option>
                    </select>
                </div>
            </div>

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="projects" id="idProjects" onChange={handleProjectChange}>
                        <option value="">Projects</option>
                        {projects.map((project) => (
                            <option key={project.projectNumber} value={project.projectNumber}>{project.projectName}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="customers" id="idCustomers" onChange={handleCustomerChange}>
                        <option value="">Customers</option>
                        {customers.map((customer) => (
                            <option key={customer.customerId} value={customer.customerId}>{customer.customerName}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {userRole !== 'PM' && (
                <div className="col-sm-auto">
                    <div className="input-light">
                        <select className="form-control" data-choices data-choices-search-false name="responsibility" id="idResponsibility" onChange={handleResponsibilityChange}>
                            <option value="">Responsibility</option>
                            {users.map((user) => (
                                <option key={user.userId} value={user.userId}>{user.userName}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="col-sm-auto">
                <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="active" id="idActive" onChange={handleActiveChange}>
                        <option value="">Active</option>
                        <option value="A">Active</option>
                        <option value="I">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="col-sm-auto">
                <button type="button" className="btn btn-primary w-100" disabled={!isFilterChanged} onClick={handleApplyFilters}> <i className="ri-equalizer-fill me-1 align-bottom"></i>
                    Apply Filter(s)
                </button>
            </div>

            <div className="filter-pills-container" style={{ paddingTop: '10px' }}>
                {renderFilterPills()}
            </div>
        </React.Fragment>
    );
};

export default TaskListGlobalFilter;