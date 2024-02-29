import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import * as XLSX from 'xlsx';
import moment from 'moment';

const ImportTasksModal = ({ show, onCloseClick, onTasksImported }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

 function excelSerialDateToDate(serial) {
  const date = new Date((serial - 25569) * 86400000);
  return moment.utc(date).format('YYYY-MM-DD');
 }

  const handleImportClick = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const tasks = jsonData.slice(1).map((row) => ({
            type: row[0] === "Project" ? "P" : "D",
            projectNumber: row[1],
            customer: row[2],
            functionArea: row[3],
            taskDescription: row[4],
            priority: row[5],
            assignedYn: row[6],
            responsibility: row[7],
            proposedTarget: row[8] ? moment.utc(excelSerialDateToDate(row[8])).format('YYYY-MM-DD') : "",
            targetDate: row[8] ? moment.utc(excelSerialDateToDate(row[8])).format('YYYY-MM-DD') : "",
            status: "NW",
            active: "A",
            logDate: row[9] ? moment.utc(excelSerialDateToDate(row[9])).format('YYYY-MM-DDT00:00:00.000') : "",
            statusDate: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
            remarks: row[10],
            timeTaken: "",
            dateCreated: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
            createdUser: sessionStorage.getItem('userId'),
            dateModified: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
            modifiedUser: sessionStorage.getItem('userId'),
            dateClosed: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS'),
            dateRemoved: moment().utc().add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss.SSS')
        }));
        onTasksImported(tasks);
        setFile(null);
        document.getElementById("fileInput").value = null;
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleCloseClick = () => {
    setFile(null);
    onCloseClick();
  }

  useEffect(() => {
    return () => {
      setFile(null);
    };
  }, []);

  return (
    <Modal fade={true} isOpen={show} toggle={handleCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="text-center">
          <h4>Import Tasks</h4>
          <p className="text-muted">Select an Excel file to import tasks.</p>
          <input type="file" accept=".xlsx, .xls" style={{ padding: "10px", marginLeft: "90px" }} onChange={handleFileChange} id="fileInput" />
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <Button color="light" onClick={handleCloseClick}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleImportClick} disabled={!file}>
            Import Task Sheet
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ImportTasksModal;