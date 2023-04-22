//My JQuery and MockAPI do not run as expected.
//I keep receiving the file not found error on Console when I inspect, although I feel like the link is correct
//I've tried multiple API's, even downloading JSON server.
//If the buttons worked like they should, you should be able to add an appointment, delete an appointment, and see a list of appointments
//I feel like the code is solid, but I'm having trouble pulling from the API. 
//Inspect error reads: GET https://64444527914c816083b74359.mockapi.io/kirbyapptbook/ 404 (Not Found)

class Appointment {
    constructor(DateOfAppointment, TimeOfAppointment, Name, ServicesCompleted) {
      this.Name = Name;
      this.DateOfAppointment = DateOfAppointment;
      this.TimeOfAppointment = TimeOfAppointment;
      this.ServicesCompleted = ServicesCompleted;
    }
  }
  
  class AppointmentService {
      static url = "https://64444527914c816083b74359.mockapi.io/kirbyapptbook";
  
    static loadAllAppointments() {
      return $.get(this.url);
    }
  
    static createAppointment(
      Name,
      DateOfAppointment,
      TimeOfAppointment,
      ServicesCompleted
    ) {
      return $.post(
        this.url,
        Name,
        DateOfAppointment,
        TimeOfAppointment,
        ServicesCompleted
      );
    }
  
    static deleteAppointment(id) {
      console.log(id, "apples");
      return $.ajax({
        url: this.url + `/${id}`,
        type: "DELETE"
      });
    }
  }
  class DOMManager {
    static appointments;
  
    static loadAllAppointments() {
      AppointmentService.loadAllAppointments().then((appointments) =>
        this.render(appointments)
      );
    }
  
    static createAppointment(
      Name,
      DateOfAppointment,
      TimeOfAppointment,
      ServicesCompleted
    ) {
      AppointmentService.createAppointment(
        new Appointment(
          Name,
          DateOfAppointment,
          TimeOfAppointment,
          ServicesCompleted
        )
      ).then(() => {
        return AppointmentService.loadAllAppointments();
      });
    }
  
    static deleteAppointment(id) {
      console.log(AppointmentService.deleteAppointment);
      AppointmentService.deleteAppointment(id)
        .then(() => {
          return AppointmentService.loadAllAppointments();
        })
        .then((appointments) => {
          this.render(appointments);
        });
    }
  
    static render(appointments) {
      this.appointments = appointments;
      fetch("https://64444527914c816083b74359.mockapi.io/kirbyapptbook/");
      $("#app").empty();
      for (let apt in appointments) {
        let appointment = appointments[apt];
        $("#app").prepend(
          ` 
          
          <div class="card  bg-dark text-primary" id="${appointment.id}">
          <div id="name" class="card-header">
          <h3>${appointment.Name}</h3>
          <div id="DateOfAppointment" class="card text-dark">Date: ${appointment.DateOfAppointment}</div>
          <div id="TimeOfAppointment" class="card text-dark">Time: ${appointment.TimeOfAppointment}</div>
          <div id="ServicesCompleated" class="card text-dark">Service: ${appointment.ServicesCompleted}</div> <br>
          
          <button id="${appointment.id}" class="btn btn-danger" onclick="DOMManager.deleteAppointment('${appointment.id}')">Delete</button>
          </div>
          </div>
  `
        );
        
      }
    }
  }
  $("#create-new-appointment").click(() => {
    AppointmentService.createAppointment(
      $("#Name, #DateOfAppointment, #TimeOfAppointment, #ServicesCompleted")
    );
    $("#Name, #DateOfAppointment, #TimeOfAppointment, #ServicesCompleted").val(
      ""
    );
  });
  
  DOMManager.loadAllAppointments();