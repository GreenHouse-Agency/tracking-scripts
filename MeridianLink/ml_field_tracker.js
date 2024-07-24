/*
 *
 * Copyright (C) GreenHouse Agency - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Justin Buys <support@ghagency.com>, July 2024
 *   
 * Application Tracking Script
 * 
 * This script tracks MeridianLink application fields set in the Application class collectFields object.
 * The values of those HTML node elements are stored in a fields object array and used to send HubSpot custom events for application progress.
 * 
 * 1. Idenitfy application type.
 * 2. Instantiate application and set fields to track based on application type.
 * 3. Initialize fields object array with field node elements.
 * 4. Create event listeners for each field node.
 * 5. Initialize fields object array with existing values from node elements.
 * 6. Update fields object with values from event listeners.
 * 7. Push updated fields object to data layer.
 * 
 */

'use strict';

class Application {
  constructor(type, collectFields) {
    const collectFields = collectFields;

    this.trackFields = collectFields[type];

    const mlInputFields = Array.from(document.getElementsByTagName("input"));
    const mlSelectFields = Array.from(document.getElementsByTagName("select"));
    const mlFields = mlInputFields.concat(mlSelectFields).filter((node) => this.trackFields.includes(node.getAttribute("id")));

    // init fields object array
    this.fields = mlFields.map((node) => ({ 
      "node": node,
      "value": node.value
    }));

    // add event listener for each field
    this.fields.forEach((field) => {
      field.node.addEventListener('change', (event) => {
        this.updateField(event.target);
      });
    });
  }

  updateField(node) {
    let index = this.fields.findIndex((field) => field.node.getAttribute("id") == node.getAttribute("id"));
    
    this.fields[index].value = node.value;
    dataLayer.push({'application': 
      {
        "fields": this.fields
      }
    });
  }
}

function initApplication(collectFields) {
  const loanType = document.getElementById("hdnLoanType");
  const busLoanType = document.getElementById("hdBusinessLoanType");
  const appType = loanType ? loanType.value : busLoanType.value;

  // init accordions
  new Application(appType, collectFields);
};