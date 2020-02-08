import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-quiz-pm",
  templateUrl: "./quiz-pm.component.html",
  styleUrls: ["./quiz-pm.component.css"]
})
export class QuizPmComponent implements OnInit {
  arrayChoose: any[] = [];
  arrayIncorrect: any[] = [];
  arrayCorrect: any[] = [];
  totalCorrect = 0;

  test: any[] = [];
  awsTest: any[] = [];

  constructor() {}

  ngOnInit() {
    this.test = this.getRandom(this.questions, 40);
      this.test.forEach(item => {
      let result = this.anwsers.find(x => x.name === item.name);
      if(result) {
        this.awsTest = [...this.awsTest, result];
      }
      else {
        console.log(item)
      }
    });
  }

  getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  choose(item: any) {
    this.arrayChoose = [...this.arrayChoose, { name: item.name, opt: item.opChoose}];
  }

  finish() {
    this.awsTest.forEach(item => {
      let result = this.arrayChoose.find(x => {
        if(x.name === item.name && x.opt === item.aws) {
          return x;
        }
      });
      if (result) {
        this.arrayCorrect = [...this.arrayCorrect, { name: item.name, aws: item.aws }];
      } else {
        this.arrayIncorrect = [...this.arrayIncorrect, { name: item.name, aws: item.aws }];
      }
    });
    console.log(this.arrayCorrect)
    console.log(this.arrayIncorrect)
  }

  //Model
  questions = [
    {
      code: 1,
      name:
        "Which of the following is NOT a type of project management office?",
      op1: "Directive",
      op2: "Value-driven",
      op3: "Supportive",
      op4: "Controlling",
      opChoose: ""
    },
    {
      code: 2,
      name:
        "Which of the following is NOT a distinguishing characteristic of a project?",
      op1: "Temporary",
      op2: "Strategic",
      op3: "Specific result",
      op4: "Progressively elaborated",
      opChoose: ""
    },
    {
      code: 3,
      name:
        "Which of the following is NOT a responsibility of a project manager?",
      op1: "Managing stakeholder expectations",
      op2: "Managing project constraints",
      op3: "Gathering product requirements",
      op4: "Sponsoring the project",
      opChoose: ""
    },
    {
      code: 4,
      name:
        "At the beginning of a project, a software team project manager is given a schedule with everyone’s vacations on it. She realizes that because the software will be delivered to the QA team exactly when they have overlapping vacations, there is a serious risk of quality problems, because there won’t be anyone to test the software before it goes into production. What BEST describes the constraint this places on the project?",
      op1: "Quality constraint",
      op2: "Time constraint",
      op3: "Resource constraint",
      op4: "Risk constraint",
      opChoose: ""
    },
    {
      code: 5,
      name: "Which of the following is NOT a Project Constraint?",
      op1: "Quality",
      op2: "Scale",
      op3: "Time",
      op4: "Cost",
      opChoose: ""
    },
    {
      code: 6,
      name:
        "A project manager is running a data center installation project. He finds that his stakeholder is angry that he’s run over his budget because the staff turned out to be more expensive than planned. The stakeholder’s unhappy that when the project is over, the servers won’t have as much drive space as he needs. Which of the following constraints was not affected by this problem?",
      op1: "Quality",
      op2: "Resource",
      op3: "Time",
      op4: "Cost",
      opChoose: ""
    },
    {
      code: 6,
      name: "Which of the following is NOT an example of operational work?",
      op1: "Building a purchase order system for accounts payable",
      op2: "Submitting weekly purchase orders through a purchase order system",
      op3: "Deploying weekly antivirus software updates",
      op4: "Yearly staff performance evaluations",
      opChoose: ""
    },
    {
      code: 7,
      name:
        "You’re managing a project to build a new accounting system. One of the accountants in another department really likes the current system and is refusing to be trained on the new one. What is the BEST way to handle this situation?",
      op1: "Refuse to work with him because he’s being difficult",
      op2:
        "Appeal to the accountant’s manager and ask to have him required to take training",
      op3:
        "Get a special dispensation so that the accountant doesn’t have to go to the trainings",
      op4:
        "Work with him to understand his concerns and do what you can to help alleviate them without compromising your project",
      opChoose: ""
    },
    {
      code: 8,
      name:
        "Which of the following is used for identifying people who are impacted by the project?",
      op1: "Resource list ",
      op2: "Stakeholder register",
      op3: "Enterprise environmental factors ",
      op4: "Project plan ",
      opChoose: ""
    },
    {
      code: 9,
      name:
        "A project coordinator is having trouble securing programmers for her project. Every time she asks her boss to give a resource to the project he says that they are too busy to help out with her project. Which type of organization is she working in?",
      op1: "Functional",
      op2: "Weak matrix",
      op3: "Strong matrix",
      op4: "Projectized",
      opChoose: ""
    },
    {
      code: 10,
      name: "Which of the following is not a stakeholder?",
      op1: "The project manager who is responsible for building the project",
      op2: "A project team member who will work on the project",
      op3: "A customer who will use the final product",
      op4:
        "A competitor whose company will lose business because of the product",
      opChoose: ""
    },
    {
      code: 11,
      name:
        "A project manager runs into a problem with her project’s contractors, and she isn’t sure if they’re abiding by the terms of the contract. Which knowledge area is the BEST source of processes to help her deal with this problem? ",
      op1: "Cost Management",
      op2: "Risk Management",
      op3: "Procurement Management",
      op4: "Communications Management",
      opChoose: ""
    },
    {
      code: 12,
      name: "Which of the following is NOT a project?",
      op1: "Repairing a car",
      op2: "Building a highway overpass",
      op3: "Running an IT support department",
      op4: "Filming a motion picture",
      opChoose: ""
    },
    {
      code: 13,
      name: "You’ve just received a change request. This means:",
      op1:
        "The project charter is complete, but the work cannot begin yet because you need to make a change to the scope baseliner",
      op2:
        "You are in the Direct and Manage Project Work process, and you can implement the change now",
      op3: "The change needs to be approved before it can be implemented.",
      op4: "There is a defect in a deliverable that must be repaired.",
      opChoose: ""
    },
    {
      code: 14,
      name:
        "You’re managing a graphic design project. One of your team members reports that there is a serious problem, and you realize that it will cause a delay that could harm the business of the stakeholders. Even worse, it will take another two days for you to fully assess the impact—until then, you won’t have the whole story. What is the BEST way to handle this situation? ",
      op1:
        "Create a change request document and submit it to the change control meeting",
      op2:
        "Pull out the project charter and show them that you have authority to make decisions",
      op3:
        "Meet with the stakeholders and tell them that there’s a problem, and you need two more days to get them the information they need",
      op4:
        "Update the lessons learned and add it to your organizational process assets",
      opChoose: ""
    },
    {
      code: 15,
      name:
        "You’re a project manager on a construction project. The electrician has started laying out the wiring, when the client comes to you with a change request. He needs additional outlets, and you think that will increase the cost of the electrical work. What is the first thing you do?",
      op1:
        "Refuse to make the change because it will increase the cost of the project and blow your budget",
      op2:
        "Refer to the Project Management plan to see how the change should be handled.",
      op3: "Consult the contract to see if there is a clause",
      op4: "Make the change, since the client requested it",
      opChoose: ""
    },
    {
      code: 16,
      name:
        "You are a project manager on a software project. When you planned the project, your enterprise environmental factors included a policy that all changes that cost over 2% of the budget need to be approved by the CFO, but smaller changes could be paid for by a management contingency fund. One of your stakeholders submitted a change request that requires a 3% increase in the budget. Your company has an outsourcing effort, and you believe that a small change to the way that the change is requested could allow you to take advantage of it and cut your costs in half. What is the BEST way to handle this situation?",
      op1:
        "Work with the stakeholder to figure out how to reduce the cost of the change by a third.",
      op2: "Request approval from the CFO.",
      op3: "Refuse the change because it is over 2% of the budget.",
      op4: "Document the change request, since all changes must be documented.",
      opChoose: ""
    },
    {
      code: 17,
      name:
        "One of your team members has discovered a defect in a deliverable and has recommended that it be repaired. Which of the following is NOT true:",
      op1: "The project charter has authorized you to perform the work",
      op2: "Your project is in Monitor and Control Project Work process",
      op3:
        "The defect repair must be approved before the deliverable can be repaired",
      op4: "You must update the Project Management plan to document the defect",
      opChoose: ""
    },
    {
      code: 18,
      name:
        "You’re a project manager on a software project. Your team is busy executing the project and creating the deliverables, but there have been several changes requested by stakeholders over the past few weeks. Each time you got one of these changes, you called a meeting with your team and the stakeholders to discuss it. Why did you do this?",
      op1: "Every change needs to be evaluated by a change control board",
      op2: "You’re delegating the work of evaluating changes",
      op3: "You do not have a good change control system in place",
      op4:
        "You are using a project management information system to assign the work.",
      opChoose: ""
    },
    {
      code: 19,
      name: "Which of the following is NOT true about the project charter?",
      op1:
        "The project charter defines the requirements that satisfy customer needs",
      op2: "The project charter defines the work authorization system",
      op3:
        "The project charter makes the business case that justifies the project",
      op4: "The project charter includes the milestone schedule",
      opChoose: ""
    },
    {
      code: 20,
      name:
        "Which of the following is NOT true about the Project Management Plan?",
      op1: "The Project Management plan contains the Scope Management plans",
      op2: "The Project Management plan gives authority to the project manager",
      op3: "The Project Management plan contains the schedule baseline",
      op4: "The Project Management plan contains the performance baseline",
      opChoose: ""
    },
    {
      code: 21,
      name:
        "You are the project manager on a network engineering project. Two weeks ago, your team began executing the project. The work has been going well, and you are now a day ahead of schedule. Two stakeholders just approached you to tell you that they have an important change that needs to be made. That change will put you behind schedule. What do you do?",
      op1: "Implement the change because you’re ahead of schedule",
      op2:
        "Refuse to make the change because the stakeholders did not take it to the change control board",
      op3:
        "Refuse to make the change until the stakeholders document it in a change request",
      op4:
        "Make sure the stakeholders know that you’re open to change, and tell them to talk to the project sponsor",
      opChoose: ""
    },
    {
      code: 22,
      name: "Which of the following is TRUE about a work breakdown structure?",
      op1:
        "It contains work packages that are described in a linear, unstructured list",
      op2: "Each item in the WBS represents a feature in the product scope",
      op3:
        "The WBS represents all of the work that must be done on the project",
      op4:
        "The WBS is created by the product sponsor and stakeholders",
      opChoose: ""
    },
    {   
      code: 23,
      name: "You are managing a software project. Your team has been working for eight weeks, and so far the project is on track. The lead programmer comes to you with a problem: there is a work package that is causing trouble. Nobody seems to know who is responsible for it, the accounting department does not know what cost center to bill it against, and it’s not even clear exactly what work should be performed. Which of the following would BEST help this situation?",
      op1:
        "Alternatives analysis",
      op2: "WBS dictionary",
      op3:
        "Scope Management plan",
      op4:
        "Scope validation",
      opChoose: ""
    },
    {   
      code: 24,
      name: "Which of the following BEST describes the purpose of a requirements traceability matrix?",
      op1:
        "It describes how WBS dictionary entries are traced to work packages, and how work packages are decomposed from deliverables.",
      op2: "It’s used to make sure that all of the subplans of the Project Management plan have been created.",
      op3:
        "It helps you understand the source of each requirement, and how that requirement was verified in a later deliverable",
      op4:
        "It’s used to trace the source of every change, so that you can keep track of them through the entire Control Scope process and verify that the change was properly implemented.",
      opChoose: ""
    },
    {   
      code: 25,
      name: "You are managing an industrial design project. One of your team members comes to you with a suggestion that will let you do more work while at the same time saving the project 15% of the budget. What is the BEST way for you to proceed?",
      op1:
        "Tell the team to make the change because it will deliver more work for less money",
      op2: "Refuse to make the change until a change request is documented and change control is performed",
      op3:
        "Refuse to consider the change because it will affect the baseline",
      op4:
        "Do a cost-benefit analysis and then make sure to inform the sponsor that the project scope changed",
      opChoose: ""
    },
    {   
      code: 26,
      name: "You are the project manager for a new project, and you want to save time creating the WBS. Which is the BEST way to do this?",
      op1:
        "Make decomposition go faster by cutting down the number of deliverables",
      op2: "Use a WBS from a previous project as a template",
      op3:
        "Don’t create the WBS dictionary",
      op4:
        "Ask the sponsor to provide the work packages for each deliverable",
      opChoose: ""
    },
    {   
      code: 27,
      name: "You are a project manager working on a project. Your sponsor wants to know who a certain work package is assigned to, what control account to bill it against, and what work is involved. What document do you refer her to?",
      op1:
        "Scope Management plan",
      op2: "WBS",
      op3:
        "WBS dictionary",
      op4:
        "Scope statement",
      opChoose: ""
    },
    {   
      code: 28,
      name: "You are the project manager for a software project. One of the teams discovers that if they deviate from the plan, they can actually skip one of the deliverables because it’s no longer necessary. They do the calculations, and realize they can save the customer 10% of the cost of the project without compromising the features in the product. They take this approach, and inform you the following week what they did during the status meeting. What is the BEST way to describe this situation?",
      op1:
        "The project team has taken initiative and saved the customer money",
      op2: "A dispute is resolved in favor of the customer",
      op3:
        "The team informed the project manager of the change, but they should have informed the customer, too",
      op4:
        "The team did not follow the Control Scope process",
      opChoose: ""
    },
    {   
      code: 29,
      name: "Which of the following BEST describes the purpose of the project scope statement?",
      op1:
        "It describes the features of the product of the project",
      op2: "It is created before the Scope Management plan",
      op3:
        "It decomposes deliverables into work packages",
      op4:
        "It describes the objectives, requirements, and deliverables of the project, and the work needed to create them",
      opChoose: ""
    },
    {   
      code: 30,
      name: "You’re managing a project when your client tells you that an external problem happened, and now you have to meet an earlier deadline. Your supervisor heard that in a situation like this, you can use schedule compression by either crashing or fast- tracking the schedule, but he’s not sure which is which. What do you tell him?",
      op1:
        "Crashing the project adds risk, while fast-tracking adds cost",
      op2: "When you crash a project, it always shortens the total duration of the project",
      op3:
        "Crashing the project adds cost, while fast-tracking adds risk.",
      op4:
        "When you fast-track a project, it always shortens the total duration of the project.",
      opChoose: ""
    },
    {   
      code: 31,
      name: "You are managing a software project. Your QA manager tells you that you need to plan to have her team start their test planning activity so that it finishes just before testing begins. But other than that, she says it can start as late in the project as necessary. What’s the relationship between the test planning activity and the testing activity?",
      op1:
        "Start-to-Start (SS)",
      op2: "Start-to-Finish (SF)",
      op3:
        "Finish-to-Start (FS)",
      op4:
        "Finish-to-Finish (FF)",
      opChoose: ""
    },
    {   
      code: 32,
      name: "You’re managing an industrial design project. You’ve come up with the complete activity list, created network diagrams, assigned resources to each activity, and estimated their durations. What’s the next thing that you do?",
      op1:
        "Use rolling wave planning to compensate for the fact that you don’t have complete information",
      op2: "Create the schedule",
      op3:
        "Consult the project scope statement and perform Sequence Activities",
      op4:
        "Use fast-tracking to reduce the total duration",
      opChoose: ""
    },
    {   
      code: 33,
      name: "Three members of your project team want to pad their estimates because they believe there are certain risks that might materialize. What is the BEST way to handle this situation?",
      op1:
        "Estimate the activities honestly, and then use a contingency reserve to cover any unexpected costs",
      op2: "Allow more time for the work by adding a buffer to every activity in the schedule",
      op3:
        "Tell the team members not to worry about it, and if the schedule is wrong it’s OK for the project to be late",
      op4:
        "Crash the schedule",
      opChoose: ""
    },
    {   
      code: 34,
      name: "You’re managing an interior decoration project when you find out that you need to get it done earlier than originally planned. You decide to fast-track the project. This means:",
      op1:
        "Starting the project sooner and working overtime",
      op2: "Assigning more people to the tasks at a greater total cost, especially for activities on the critical path",
      op3:
        "Starting activities earlier and overlapping them more, which will cost more and could add risks",
      op4:
        "Shortening the durations of the activities and asking people to work overtime to accommodate that",
      opChoose: ""
    },
    {   
      code: 35,
      name: "What’s the correct order of the Project Schedule Management planning processes?",
      op1:
        "Sequence Activities, Define Activities, Estimate Activity Resources, Estimate Activity Durations, Develop Schedule",
      op2: "Plan Schedule Management, Define Activities, Sequence Activities, Develop Schedule, Estimate Activity Resources, Estimate Activity Durations",
      op3:
        "Plan Schedule Management, Define Activities, Sequence Activities, Estimate Activity Resources, Estimate Activity Durations, Develop Schedule",
      op4:
        "Plan Schedule Management, Develop Schedule, Define Activities, Sequence Activities, Estimate Activity Resources, Estimate Activity Durations",
      opChoose: ""
    },
    {   
      code: 36,
      name: "You are working on the project plan for a software project. Your company has a standard spreadsheet that you use to generate estimates. To use the spreadsheet, you meet with the team to estimate the number of functional requirements, use cases, and design wireframes for the project. Then you categorize them into high, medium, or low complexity. You enter all of those numbers into the spreadsheet, which uses a data table derived from past projects’ actual costs and durations, performs a set of calculations, and generates a final estimate. What kind of estimation is being done?",
      op1:
        "Parametric",
      op2: "Rough order of magnitude",
      op3:
        "Bottom-up",
      op4:
        "Analogous",
      opChoose: ""
    },
    {   
      code: 37,
      name: "You are starting to write your project charter with your project sponsor when the senior managers ask for a time and cost estimate for the project. You have not yet gathered many of the project details. What kind of estimate can you give?",
      op1:
        "Analogous estimate",
      op2: "Rough order of magnitude estimate",
      op3:
        "Parametric estimate",
      op4:
        "Bottom-up estimate",
      opChoose: ""
    },
    {   
      code: 38,
      name: "Which of the following is NOT a part of quality?",
      op1:
        "Fitness for use",
      op2: "Conformance to requirements",
      op3:
        "Value to the sponsor",
      op4:
        "Customer satisfaction",
      opChoose: ""
    },
    {   
      code: 39,
      name: "When is inspection performed?",
      op1:
        "At the beginning of the project",
      op2: "Any time a project deliverable is produced",
      op3:
        "Just before the final product is delivered",
      op4:
        "At the end of the project",
      opChoose: ""
    },
    {   
      code: 40,
      name: "What’s the difference between Control Quality and Validate Scope?",
      op1:
        "Control Quality is done at the end of the project, while Validate Scope is done throughout the project",
      op2: "Control Quality is performed by the project manager, while Validate Scope is done by the sponsor",
      op3:
        "Control Quality is performed by the sponsor, while Validate Scope is done by the project manager",
      op4:
        "Control Quality means looking for defects in deliverables, while Validate Scope means validating that the product is acceptable to the stakeholders",
      opChoose: ""
    },
    {   
      code: 41,
      name: "You are using a control chart to analyze defects when something on the chart causes you to realize that you have a serious quality problem. What is the MOST likely reason for this?",
      op1:
        "The rule of seven",
      op2: "Upper control limits",
      op3:
        "Lower control limits",
      op4:
        "Plan-Do-Check-Act",
      opChoose: ""
    },
    {   
      code: 42,
      name: "Which of the following BEST describes defect repair review?",
      op1:
        "Reviewing the repaired defect with the stakeholder to make sure it’s acceptable",
      op2: "Reviewing the repaired defect with the team to make sure they document lessons learned",
      op3:
        "Reviewing the repaired defect to make sure it was fixed properly",
      op4:
        "Reviewing the repaired defect to make sure it’s within the control limits",
      opChoose: ""
    },
    {   
      code: 43,
      name: "Which of the following is associated with the 80/20 rule?",
      op1:
        "Scatter chart",
      op2: "Histogram",
      op3:
        "Control chart",
      op4:
        "Pareto chart",
      opChoose: ""
    },
    {   
      code: 44,
      name: "A RACI matrix is one way to show roles and responsibilities on your project. What does RACI stand for?",
      op1:
        "Responsible, Approve, Consult, Identify",
      op2: "Responsible, Accountable, Consulted, Informed",
      op3:
        "Retain, Approve, Confirm, Inform",
      op4:
        "Responsible, Accountable, Confirm, Inform",
      opChoose: ""
    },
  ];

  anwsers = [
    {
      name:
        "Which of the following is NOT a type of project management office?",
      aws: "Value-driven"
    },
    {
      name:
        "Which of the following is NOT a distinguishing characteristic of a project?",
      aws: "Strategic"
    },
    {
      name:
        "Which of the following is NOT a responsibility of a project manager?",
      aws: "Sponsoring the project"
    },
    {
      name:
        "At the beginning of a project, a software team project manager is given a schedule with everyone’s vacations on it. She realizes that because the software will be delivered to the QA team exactly when they have overlapping vacations, there is a serious risk of quality problems, because there won’t be anyone to test the software before it goes into production. What BEST describes the constraint this places on the project?",
      aws: "Resource constraint"
    },
    {
      name: "Which of the following is NOT a Project Constraint?",
      aws: "Scale"
    },
    {
      name:
        "A project manager is running a data center installation project. He finds that his stakeholder is angry that he’s run over his budget because the staff turned out to be more expensive than planned. The stakeholder’s unhappy that when the project is over, the servers won’t have as much drive space as he needs. Which of the following constraints was not affected by this problem?",
      aws: "Time"
    },
    {
      name: "Which of the following is NOT an example of operational work?",
      aws: "Building a purchase order system for accounts payable"
    },
    {
      name:
        "Which of the following is NOT a type of project management office?",
      aws: "Value-driven"
    },
    {
      name:
        "You’re managing a project to build a new accounting system. One of the accountants in another department really likes the current system and is refusing to be trained on the new one. What is the BEST way to handle this situation?",
      aws:
        "Work with him to understand his concerns and do what you can to help alleviate them without compromising your project"
    },
    {
      name:
        "Which of the following is used for identifying people who are impacted by the project?",
      aws: "Stakeholder register"
    },
    {
      name:
        "A project coordinator is having trouble securing programmers for her project. Every time she asks her boss to give a resource to the project he says that they are too busy to help out with her project. Which type of organization is she working in?",
      aws: "Functional"
    },
    {
      name: "Which of the following is not a stakeholder?",
      aws:
        "A competitor whose company will lose business because of the product"
    },
    {
      name:
        "A project manager runs into a problem with her project’s contractors, and she isn’t sure if they’re abiding by the terms of the contract. Which knowledge area is the BEST source of processes to help her deal with this problem? ",
      aws: "Procurement Management"
    },
    {
      name: "Which of the following is NOT a project?",
      aws: "Running an IT support department"
    },
    {
      name: "You’ve just received a change request. This means:",
      aws: "The change needs to be approved before it can be implemented."
    },
    {
      name:
        "You’re managing a graphic design project. One of your team members reports that there is a serious problem, and you realize that it will cause a delay that could harm the business of the stakeholders. Even worse, it will take another two days for you to fully assess the impact—until then, you won’t have the whole story. What is the BEST way to handle this situation? ",
      aws:
        "Meet with the stakeholders and tell them that there’s a problem, and you need two more days to get them the information they need"
    },
    {
      name:
        "You’re a project manager on a construction project. The electrician has started laying out the wiring, when the client comes to you with a change request. He needs additional outlets, and you think that will increase the cost of the electrical work. What is the first thing you do?",
      aws: "Refer to the Project Management plan to see how the change should be handled."
    },
    {
      name:
        "You are a project manager on a software project. When you planned the project, your enterprise environmental factors included a policy that all changes that cost over 2% of the budget need to be approved by the CFO, but smaller changes could be paid for by a management contingency fund. One of your stakeholders submitted a change request that requires a 3% increase in the budget. Your company has an outsourcing effort, and you believe that a small change to the way that the change is requested could allow you to take advantage of it and cut your costs in half. What is the BEST way to handle this situation?",
      aws: "Request approval from the CFO."
    },
    {
      name:
        "One of your team members has discovered a defect in a deliverable and has recommended that it be repaired. Which of the following is NOT true:",
      aws: "You must update the Project Management plan to document the defect"
    },
    {
      name:
        "You’re a project manager on a software project. Your team is busy executing the project and creating the deliverables, but there have been several changes requested by stakeholders over the past few weeks. Each time you got one of these changes, you called a meeting with your team and the stakeholders to discuss it. Why did you do this?",
      aws: "You do not have a good change control system in place"
    },
    {
      name: "Which of the following is NOT true about the project charter?",
      aws: "The project charter defines the work authorization system"
    },
    {
      name:
        "Which of the following is NOT true about the Project Management Plan?",
      aws: "The Project Management plan gives authority to the project manager"
    },
    {
      name:
        "You are the project manager on a network engineering project. Two weeks ago, your team began executing the project. The work has been going well, and you are now a day ahead of schedule. Two stakeholders just approached you to tell you that they have an important change that needs to be made. That change will put you behind schedule. What do you do?",
      aws:
        "Refuse to make the change until the stakeholders document it in a change request"
    },
    {
      name: "You are managing a software project. Your team has been working for eight weeks, and so far the project is on track. The lead programmer comes to you with a problem: there is a work package that is causing trouble. Nobody seems to know who is responsible for it, the accounting department does not know what cost center to bill it against, and it’s not even clear exactly what work should be performed. Which of the following would BEST help this situation?",
      aws: "WBS dictionary"
    },
    {
      name:
        "Which of the following BEST describes the purpose of a requirements traceability matrix",
      aws: "It helps you understand the source of each requirement, and how that requirement was verified in a later deliverable"
    },
    {
      name:
        "You are managing an industrial design project. One of your team members comes to you with a suggestion that will let you do more work while at the same time saving the project 15% of the budget. What is the BEST way for you to proceed?",
      aws: "Refuse to make the change until a change request is documented and change control is performed"
    },
    {
      name:
        "You are the project manager for a new project, and you want to save time creating the WBS. Which is the BEST way to do this?",
      aws: "Use a WBS from a previous project as a template"
    },
    {
      name:
        "You are a project manager working on a project. Your sponsor wants to know who a certain work package is assigned to, what control account to bill it against, and what work is involved. What document do you refer her to?",
      aws: "WBS dictionary"
    },
    {
      name:
        "Which of the following BEST describes the purpose of the project scope statement?",
      aws: "It describes the objectives, requirements, and deliverables of the project, and the work needed to create them"
    },
    {
      name:
        "You’re managing a project when your client tells you that an external problem happened, and now you have to meet an earlier deadline. Your supervisor heard that in a situation like this, you can use schedule compression by either crashing or fast- tracking the schedule, but he’s not sure which is which. What do you tell him?",
      aws: "Crashing the project adds cost, while fast-tracking adds risk."
    },
    {
      name:
        "Which of the following BEST describes the purpose of a requirements traceability matrix?",
      aws: "It helps you understand the source of each requirement, and how that requirement was verified in a later deliverable"
    },
    {
      name:
        "Which of the following is TRUE about a work breakdown structure?",
      aws: "The WBS represents all of the work that must be done on the project"
    },
    {
      name:
        "You are the project manager for a software project. One of the teams discovers that if they deviate from the plan, they can actually skip one of the deliverables because it’s no longer necessary. They do the calculations, and realize they can save the customer 10% of the cost of the project without compromising the features in the product. They take this approach, and inform you the following week what they did during the status meeting. What is the BEST way to describe this situation?",
      aws: "The team did not follow the Control Scope process"
    },
    {
      name:
        "You are managing a software project. Your QA manager tells you that you need to plan to have her team start their test planning activity so that it finishes just before testing begins. But other than that, she says it can start as late in the project as necessary. What’s the relationship between the test planning activity and the testing activity?",
      aws: "Finish-to-Start (FS)"
    },
    {
      name:
        "You’re managing an industrial design project. You’ve come up with the complete activity list, created network diagrams, assigned resources to each activity, and estimated their durations. What’s the next thing that you do?",
      aws: "Create the schedule"
    },
    {
      name:
        "Three members of your project team want to pad their estimates because they believe there are certain risks that might materialize. What is the BEST way to handle this situation?",
      aws: "Estimate the activities honestly, and then use a contingency reserve to cover any unexpected costs"
    },
    {
      name:
        "You’re managing an interior decoration project when you find out that you need to get it done earlier than originally planned. You decide to fast-track the project. This means:",
      aws: "Starting activities earlier and overlapping them more, which will cost more and could add risks"
    },
    {
      name:
        "What’s the correct order of the Project Schedule Management planning processes?",
      aws: "Plan Schedule Management, Define Activities, Sequence Activities, Estimate Activity Resources, Estimate Activity Durations, Develop Schedule"
    },
    {
      name:
        "You are working on the project plan for a software project. Your company has a standard spreadsheet that you use to generate estimates. To use the spreadsheet, you meet with the team to estimate the number of functional requirements, use cases, and design wireframes for the project. Then you categorize them into high, medium, or low complexity. You enter all of those numbers into the spreadsheet, which uses a data table derived from past projects’ actual costs and durations, performs a set of calculations, and generates a final estimate. What kind of estimation is being done?",
      aws: "Parametric"
    },
    {
      name:
        "You are starting to write your project charter with your project sponsor when the senior managers ask for a time and cost estimate for the project. You have not yet gathered many of the project details. What kind of estimate can you give?",
      aws: "Rough order of magnitude estimate"
    },
    {
      name:
        "Which of the following is NOT a part of quality?",
      aws: "Value to the sponsor"
    },
    {
      name:
        "When is inspection performed?",
      aws: "Any time a project deliverable is produced"
    },
    {
      name:
        "What’s the difference between Control Quality and Validate Scope?",
      aws: "Control Quality means looking for defects in deliverables, while Validate Scope means validating that the product is acceptable to the stakeholders"
    },
    {
      name: "You are using a control chart to analyze defects when something on the chart causes you to realize that you have a serious quality problem. What is the MOST likely reason for this?",
      aws: "The rule of seven"
    },
    {
      name: "Which of the following BEST describes defect repair review?",
      aws: "Reviewing the repaired defect to make sure it was fixed properly"
    },
    {
      name: "Which of the following is associated with the 80/20 rule?",
      aws: "Pareto chart"
    },
    {
      name: "A RACI matrix is one way to show roles and responsibilities on your project. What does RACI stand for?",
      aws: "Responsible, Accountable, Consulted, Informed"
    },
  ];
}
