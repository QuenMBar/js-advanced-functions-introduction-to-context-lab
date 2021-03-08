// Your code here
function createEmployeeRecord(recordArray) {
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(recordArrayArray) {
    let newArray = [];
    recordArrayArray.forEach((recordArray) => {
        newArray.push(createEmployeeRecord(recordArray));
    });
    return newArray;
}

function createTimeInEvent(employee, date) {
    let dateSplit = date.split(" ");
    employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(dateSplit[1]), date: dateSplit[0] });
    return employee;
}

function createTimeOutEvent(employee, date) {
    let dateSplit = date.split(" ");
    employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(dateSplit[1]), date: dateSplit[0] });
    return employee;
}

function hoursWorkedOnDate(employee, workOnDate) {
    let timeInDates = employee.timeInEvents;
    let timeOutDates = employee.timeOutEvents;
    let timeInDatesOnDates = timeInDates.find((dateObj) => dateObj.date == workOnDate);
    let timeOutDatesOnDates = timeOutDates.find((dateObj) => dateObj.date == workOnDate);

    return (parseInt(timeOutDatesOnDates.hour) - parseInt(timeInDatesOnDates.hour)) / 100;
}

function wagesEarnedOnDate(employee, workOnDate) {
    return hoursWorkedOnDate(employee, workOnDate) * employee.payPerHour;
}

function allWagesFor(employee) {
    let payOut = 0;
    employee.timeInEvents.forEach((date) => {
        payOut += wagesEarnedOnDate(employee, date.date);
    });
    return payOut;
}

function calculatePayroll(employees) {
    let payroll = 0;
    employees.forEach((employee) => {
        payroll += allWagesFor(employee);
    });
    return payroll;
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find((employee) => employee.firstName === firstName);
}

// let testEmployee = {
//     firstName: "Quentin",
//     familyName: "Barnes",
//     title: "Mr.",
//     payPerHour: "2",
//     timeInEvents: [{ type: "TimeIn", hour: "0800", date: "2002-02-21" }],
//     timeOutEvents: [{ type: "TimeOut", hour: "2200", date: "2002-02-21" }],
// };
// console.log(hoursWorkedOnDate(testEmployee, "2002-02-21"));

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
// // Earns 324
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100");
// // Earns 54
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");
// // 324 + 54
// console.log(allWagesFor(cRecord));
