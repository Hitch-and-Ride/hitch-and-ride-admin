import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

export class Dashboard extends Component {
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      visitSaleData: {},
      visitSaleOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: false,
                min: 0,
                stepSize: 20,
                max: 80,
              },
              gridLines: {
                drawBorder: false,
                color: "rgba(235,237,242,1)",
                zeroLineColor: "rgba(235,237,242,1)",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
                color: "rgba(0,0,0,1)",
                zeroLineColor: "rgba(235,237,242,1)",
              },
              ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
              },
              categoryPercentage: 0.5,
              barPercentage: 0.5,
            },
          ],
        },
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      trafficData: {},
      trafficOptions: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        legend: false,
      },
      todos: [
        {
          id: 1,
          task: "Pick up kids from school",
          isCompleted: false,
        },
        {
          id: 2,
          task: "Prepare for presentation",
          isCompleted: true,
        },
        {
          id: 3,
          task: "Print Statements",
          isCompleted: false,
        },
        {
          id: 4,
          task: "Create invoice",
          isCompleted: false,
        },
        {
          id: 5,
          task: "Call John",
          isCompleted: true,
        },
        {
          id: 6,
          task: "Meeting with Alisa",
          isCompleted: false,
        },
      ],
      inputValue: "",
    };
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }
  statusChangedHandler(event, id) {
    //const todoIndex = this.state.todos.findIndex( t => t.id === id );
    const todo = { ...this.state.todos[id] };
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
      todos: todos,
    });
  }

  addTodo(event) {
    event.preventDefault();

    const todos = [...this.state.todos];
    todos.unshift({
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      task: this.state.inputValue,
      isCompleted: false,
    });

    this.setState({
      todos: todos,
      inputValue: "",
    });
  }

  removeTodo(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);

    this.setState({
      todos: todos,
    });
  }

  inputChangeHandler(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  componentDidMount() {
    //your code
    var ctx = document.getElementById("visitSaleChart").getContext("2d");
    var gradientBar1 = ctx.createLinearGradient(0, 0, 0, 181);
    gradientBar1.addColorStop(0, "rgba(218, 140, 255, 1)");
    gradientBar1.addColorStop(1, "rgba(154, 85, 255, 1)");

    var gradientBar2 = ctx.createLinearGradient(0, 0, 0, 360);
    gradientBar2.addColorStop(0, "rgba(54, 215, 232, 1)");
    gradientBar2.addColorStop(1, "rgba(177, 148, 250, 1)");

    var gradientBar3 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBar3.addColorStop(0, "rgba(255, 191, 150, 1)");
    gradientBar3.addColorStop(1, "rgba(254, 112, 150, 1)");

    var gradientdonut1 = ctx.createLinearGradient(0, 0, 0, 181);
    gradientdonut1.addColorStop(0, "rgba(54, 215, 232, 1)");
    gradientdonut1.addColorStop(1, "rgba(177, 148, 250, 1)");

    var gradientdonut2 = ctx.createLinearGradient(0, 0, 0, 50);
    gradientdonut2.addColorStop(0, "rgba(6, 185, 157, 1)");
    gradientdonut2.addColorStop(1, "rgba(132, 217, 210, 1)");

    var gradientdonut3 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientdonut3.addColorStop(0, "rgba(254, 124, 150, 1)");
    gradientdonut3.addColorStop(1, "rgba(255, 205, 150, 1)");

    const newVisitSaleData = {
      labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
      datasets: [
        {
          label: "CHN",
          borderColor: gradientBar1,
          backgroundColor: gradientBar1,
          hoverBackgroundColor: gradientBar1,
          legendColor: gradientBar1,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: [20, 40, 15, 35, 25, 50, 30, 20],
        },
        {
          label: "USA",
          borderColor: gradientBar2,
          backgroundColor: gradientBar2,
          hoverBackgroundColor: gradientBar2,
          legendColor: gradientBar2,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: [40, 30, 20, 10, 50, 15, 35, 40],
        },
        {
          label: "UK",
          borderColor: gradientBar3,
          backgroundColor: gradientBar3,
          hoverBackgroundColor: gradientBar3,
          legendColor: gradientBar3,
          pointRadius: 0,
          fill: false,
          borderWidth: 1,
          data: [70, 10, 30, 40, 25, 50, 15, 30],
        },
      ],
    };
    const newTrafficData = {
      datasets: [
        {
          data: [30, 60],
          backgroundColor: [gradientdonut1, gradientdonut2, gradientdonut3],
          hoverBackgroundColor: [
            gradientdonut1,
            gradientdonut2,
            gradientdonut3,
          ],
          borderColor: [gradientdonut1, gradientdonut2, gradientdonut3],
          legendColor: [gradientdonut1, gradientdonut2, gradientdonut3],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Trips", "Equipment"],
    };
    this.setState({
      visitSaleData: newVisitSaleData,
      trafficData: newTrafficData,
    });
  }

  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }

  render() {
    return (
      <div>
        <div className="proBanner"></div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span>{" "}
            Dashboard{" "}
          </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                <span></span>Overview{" "}
                <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">
                <img
                  src={require("../../assets/images/dashboard/circle.svg")}
                  className="card-img-absolute"
                  alt="circle"
                />
                <h4 className="font-weight-normal mb-3">
                  Weekly Trips{" "}
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">$ 15,0000</h2>
                <h6 className="card-text">Increased by 60%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img
                  src={require("../../assets/images/dashboard/circle.svg")}
                  className="card-img-absolute"
                  alt="circle"
                />
                <h4 className="font-weight-normal mb-3">
                  Weekly Bookings{" "}
                  <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">45,6334</h2>
                <h6 className="card-text">Decreased by 10%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img
                  src={require("../../assets/images/dashboard/circle.svg")}
                  className="card-img-absolute"
                  alt="circle"
                />
                <h4 className="font-weight-normal mb-3">
                  Visitors Online{" "}
                  <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">95,5741</h2>
                <h6 className="card-text">Increased by 5%</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="clearfix mb-4">
                  <h4 className="card-title float-left">Booking Statistics</h4>
                  <div
                    id="visit-sale-chart-legend"
                    className="rounded-legend legend-horizontal legend-top-right float-right"
                  >
                    <ul>
                      <li>
                        <span className="legend-dots bg-primary"></span>Mbale
                      </li>
                      <li>
                        <span className="legend-dots bg-danger"></span>Kampala
                      </li>
                      <li>
                        <span className="legend-dots bg-info"></span>West Nile
                      </li>
                    </ul>
                  </div>
                </div>
                <Bar
                  ref="chart"
                  className="chartLegendContainer"
                  data={this.state.visitSaleData}
                  options={this.state.visitSaleOptions}
                  id="visitSaleChart"
                />
              </div>
            </div>
          </div>
          <div className="col-md-5 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Bookings</h4>
                <Doughnut
                  data={this.state.trafficData}
                  options={this.state.trafficOptions}
                />
                <div
                  id="traffic-chart-legend"
                  className="rounded-legend legend-vertical legend-bottom-left pt-4"
                >
                  <ul>
                    <li>
                      <span className="legend-dots bg-info"></span>Trips
                      <span className="float-right">30%</span>
                    </li>
                    <li>
                      <span className="legend-dots bg-success"></span>Equipment
                      <span className="float-right">60%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
       
      </div>
    );
  }
}
export default Dashboard;
