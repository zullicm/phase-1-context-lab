/* Your Code Here */
function createEmployeeRecord(array){
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents:[],
      timeOutEvents:[]
    }
  }

function createEmployeeRecords(array){
    const employeeRecords = []
    for(const nestedArray of array){
      employeeRecords.push(createEmployeeRecord(nestedArray))
    }
    return employeeRecords
}

function createTimeInEvent(dateTime){
    const newDates = dateTime.split(' ')
    const dateHour = parseInt(newDates[1],10)
    const timeInEvent = {
      type: 'TimeIn',
      hour: dateHour,
      date: newDates[0]
    }
    this.timeInEvents.push(timeInEvent)
    return this
}

function createTimeOutEvent(dateTime){
    const newDates = dateTime.split(' ')
    const dateHour = parseInt(newDates[1],10)
    const timeOutEvent = {
      type: 'TimeOut',
      hour: dateHour,
      date: newDates[0]
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}

function hoursWorkedOnDate(date){
    const timeIn = this.timeInEvents.find(event => event.date === date)
    const timeOut = this.timeOutEvents.find(event => event.date === date)
    const hoursWorked = timeOut.hour - timeIn.hour
  
    return hoursWorked / 100
  }

  function wagesEarnedOnDate(date){
    const hours = hoursWorkedOnDate.call(this, date)
    const rate = this.payPerHour
    return rate * hours
  }


// ALL WAGES





/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Thor", "Odinsson", "StrongGuy", 400]
]
let emps = createEmployeeRecords(src)



function findEmployeeByFirstName(srcArray, name){
    for(const fName of srcArray){
        if(fName.firstName === name){
            return fName
        }
    }
}


function calculatePayroll(employeeRecords){
    const record = employeeRecords.map(employee => allWagesFor.call(employee))

    return record.reduce((currentValue, total) => currentValue + total)
  }