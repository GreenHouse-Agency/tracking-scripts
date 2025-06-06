export default class Application {

  constructor(type) {
    this.fields = {
      "application_session_id": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": this.createPersistentId()
      },
      "application_pseudo_id": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "application_id": {
        "type": "string",
        "locator": "query",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": "hdloanDtl",
        "value": null
      },
      "application_type": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": type
      },
      "first_name": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "FirstName",
        "selector": null,
        "value": null
      },
      "last_name": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "LastName",
        "selector": null,
        "value": null
      },
      "email": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "EmailAddr",
        "selector": null,
        "value": null
      },
      "cell_phone": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "MobilePhone",
        "selector": null,
        "value": null
      },
      "home_phone": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "HomePhone",
        "selector": null,
        "value": null
      },
      "work_phone": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "WorkPhone",
        "selector": null,
        "value": null
      },
      "preferred_contact_method": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "ContactMethod",
        "selector": null,
        "value": null
      },
      "amount": {
        "type": "number",
        "locator": "query",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": "#txtTotalDeposit, #txtRequestCreditLimit, #txtLoanAmount, #txtLoanRequestAmount, #txtProposedLoanAmount",
        "value": this.getAmount()
      },
      "finish_later": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "new_member_application": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "type",
        "selector": null,
        "value": null
      },
      "youth_account": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "saAccountCode",
        "selector": null,
        "value": null
      },
      "business_application": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "line_of_credit": {
        "type": "string",
        "locator": "query",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": "hdIsLineOfCredit",
        "value": null
      },
      "eligibility": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "FOMName",
        "selector": null,
        "value": null
      },
      "deposit_products": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "SelectedProducts",
        "selector": null,
        "value": null
      },
      "application_purpose": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "LoanPurpose",
        "selector": null,
        "value": null
      },
      "credit_card_name": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "CreditCardName",
        "selector": null,
        "value": null
      },
      "vehicle_type": {
        "type": "string",
        "locator": "object",
        "objectLocation": "root",
        "objectPropertyName": "VehicleType",
        "selector": null,
        "value": null
      },
      "hs_utm_campaign": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "hs_utm_content": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "hs_utm_medium": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "hs_utm_source": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "hs_utm_term": {
        "type": "string",
        "locator": "default",
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      }
    }

    this.appType = type;
    this.portalID = "";
    this.customEventName = `pe${this.portalID}_online_application_progress`;
    this.cookieName = 'persistent_id_' + this.appType;
    this.contactIdentified = false;

    // Create persistent ID and set cookie
    this.createPersistentId();

    // Initialize Fields property values with query parameters
    this.queryParamterPrefill();

    // Start interval to update field values every minute
    setInterval(
        this.updateFieldValues.bind(this),
        60000
    );

    // Create event listener for next button
    this.createNextButtonEventListener();
  }

  /***********************************/
  /*** Start Persistent ID Methods ***/
  /***********************************/

  // Sets the application session ID field with a persistent ID
  setPersistentId() {
    this.fields.application_session_id.value = this.createPersistentId();
  }

  // Returnes the persistent ID based on the application type
  // If the persistent ID and cookie does not exist, it creates a new one
  createPersistentId() {
    const persistentID = this.getCookie();

    if (!persistentID) {
      if (this.appType !== 'unknown') {
        persistentID = this.setPersistentIDCookie(this.appType);
      }
    }

    return persistentID;
  }

  // Returns the cookie based on the cookie name
  getCookie() {
    const match = document.cookie.match(new RegExp('(^| )' + this.cookieName + '=([^;]+)'));

    if (match) {
      return decodeURIComponent(match[2]);
    }

    return null;
  }

  // Creates a persistent ID cookie with the application type ID and a random UUID
  setPersistentIDCookie(applicationTypeID) {
    const persistentID = applicationTypeID + "-" + self.crypto.randomUUID();
    const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";

    document.cookie = this.cookieName + "=" + encodeURIComponent(persistentID) + "; path=/; " + expires + "; SameSite=Lax";
    
    return persistentID;
  }
  /*********************************/
  /*** End Persistent ID Methods ***/
  /*********************************/



  /*********************************************/
  /*** Start Query Parameter Prefill Methods ***/
  /*********************************************/

  // Maps query parameter values to field property values based on matching key and query paramter names
  queryParamterPrefill() {
    const utmParams = new URLSearchParams(window.location.search);

    for (const [key, value] of Object.entries(this.fields)) {
      if(this.fields.hasOwn(key)) {
        this.fields[key].value = value;
      }
    };
  }
  /*******************************************/
  /*** End Query Parameter Prefill Methods ***/
  /*******************************************/


  
  /****************************************/
  /*** Start Update Field Value Methods ***/
  /****************************************/
  updateFieldValues() {
    for (const [key, field] of Object.entries(this.fields)) {
      const oldValue = field.value;
      const newValue = this.getFieldValue(field);

      // if the value has changed and the new value is not null or undefined, update the field value
      if (newValue !== null && newValue !== undefined && newValue !== oldValue) {
        field.value = this.formatFieldValue(newValue);

        // If the field is an email and the email is known, identify the HubSpot contact
        if (key == "email" && !this.contactIdentified) {
          this.identifyHubSpotContact();
        }
      }
    };

    if (this.emailKnown()) {
      if (this.appSubmitted()) {
        this.resetPersistentId();
        this.createPseudoId();
        this.sendCustomEvent();
        this.closeApplication();
      } else {
        this.sendCustomEvent();
      }
    }
  }

  // Retrieves the value of a field based on its locator type
  // If the field is an object, it retrieves the value from the object property
  // If the field is a query, it retrieves the value from a querySelector
  getFieldValue(field) {
    let value = null;

    if (field.locator === "object") {
      if (field.objectLocation && field.objectPropertyName) {
        const object = window[field.objectLocation];
        if (object && object.hasOwnProperty(field.objectPropertyName)) {
          value = object[field.objectPropertyName];
        }
      }
    } else if (field.locator === "query") {
      const element = document.querySelector(field.selector);
      if (element) {
        value = element.value || element.innerText;
      }
    }

    return value;
  }

  formatFieldValue(field) {
    let value = field.value;

    if (field.type === "number") {
      value = this.convertToNumber(value);
    } else if (field.type === "bool") {
      value = this.convertToBool(value);
    } else if (field.type === "string" && Array.isArray(value)) {
      value = this.convertToEnum(value);
    }

    return value;
  }

  // Helper function to convert a string to a number, or return null if conversion fails
  convertToNumber(value) {
      if (typeof value === 'string') {
          // Remove any extra spaces and potential dollar signs or commas
          value = value.replace(/^\$\s*/, '').replace(/,/g, '');
      }
      var parsedNumber = parseFloat(value);
      return isNaN(parsedNumber) ? null : parsedNumber;
  }

  // Helper function to convert a string to a number, or return null if conversion fails
  convertToBool(value) {
    var newValue = value.toString().toLowerCase();

    if (newValue === "true" || newValue === "1" || newValue === "yes" || newValue === "y") {
      newValue = "Yes";
    } else {
      newValue = "No";
    }

    return newValue;
  }

  // Helper function to convert an array to a semicolon delimitted list, or return null if conversion fails
  convertToEnum(array) {
    var newValue = null;
    if (Array.isArray(array)) {
      // Reduce porudct array to string of product codes
      const initialValue = "";
      newValue = array.reduce(
        (accumulator, currentValue) => accumulator + ";" + currentValue,
        initialValue,
      );
      newValue = newValue.substring(1);
    }

    return newValue;
  }

  identifyHubSpotContact () {
    var _hsq = window._hsq = window._hsq || [];
    var email = this.getEmail();
    var first_name = this.fields.find((field) => field.eventPropertyName == "first_name").value;
    var last_name = this.fields.find((field) => field.eventPropertyName == "last_name").value;

    _hsq.push(["identify",{
        email: email,
        firstname: first_name,
        lastname: last_name
    }]); 
  }

  emailKnown() {
    let email = this.fields.email.value;

    if (email && typeof email === "string" && email.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  appSubmitted() {
    const currentURL = this.getCurrentURL();

    return currentURL.includes("decision") || currentURL.includes("referral");
  }

  getCurrentURL() {
    return window.location.href;
  }

  resetPersistentId() {
    document.cookie = this.cookieName + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  // Creates a pseudo ID for the application
  // This is used to track the application progress in HubSpot
  // The pseudo ID is a an identifier that combines the applicaiton type, email, and the submission date
  // Example: "consumer-loan-john.doe@gmail.com-20231001"
  createPseudoId() {
    const email = this.fields.email.value;
    const submissionDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const pseudoId = `${this.appType}-${email}-${submissionDate}`;
    
    this.fields.application_pseudo_id.value = pseudoId;
  }

  /**************************************/
  /*** End Update Field Value Methods ***/
  /**************************************/



  /**********************************/
  /*** Start Custom Event Methods ***/
  /**********************************/
  sendCustomEvent() {    
    var _hsq = window._hsq = window._hsq || [];

    _hsq.push(["trackCustomBehavioralEvent", {
        name: this.customEventName,
        properties: this.getCustomEventProperties()
    }]);
  }


  getCustomEventProperties() {
    var properties = {};

    for (const [key, field] of Object.entries(this.fields)) {
      if (field.value !== null && field.value !== undefined) {
        properties[key] = field.value;
      }
    }

    return properties;
  }
  /********************************/
  /*** End Custom Event Methods ***/
  /********************************/
}

export function initApplication() {
  var loanType = document.getElementById("hdnLoanType") || document.getElementById("hdLoanType");
  var mapAppType = {
    "1": "consumer_deposit",
    "2": "consumer_loan",
    "3": "consumer_vehicle",
    "4": "consumer_credit_card",
    "5": "consumer_equity",
    "6": "consumer_real_estate",
    "7": "commercial_deposit",
    "8": "commercial_loan",
    "9": "commercial_vehicle",
    "10": "commercial_credit_card",
    "11": "commercial_equity",
    "12": "commercial_real_estate"
  };

  appType = mapAppType[loanType.value];

  if (appType) {
    return new Application(appType);
  } else {
    return null;
  }
};

export const gha_application = initApplication();