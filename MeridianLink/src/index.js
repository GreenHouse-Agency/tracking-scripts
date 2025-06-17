export default class Application {

  constructor(type) {
    // TODO: Update locator, function, objectLocation, objectPropertyName, and selector 
    // based on the location of each field in the POS.
    this.fields = {
      "application_session_id": {
        "type": "string",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "application_pseudo_id": {
        "type": "string",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "application_id": {
        "type": "string",
        "locator": "query",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": "#hdloanDtl",
        "value": null
      },
      "application_type": {
        "type": "string",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": type
      },
      "first_name": {
        "type": "string",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "FirstName",
        "selector": null,
        "value": null
      },
      "last_name": {
        "type": "string",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "LastName",
        "selector": null,
        "value": null
      },
      "email": {
        "type": "string",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "EmailAddr",
        "selector": null,
        "value": null
      },
      "cell_phone": {
        "type": "phone",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "MobilePhone",
        "selector": null,
        "value": null
      },
      "home_phone": {
        "type": "phone",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "HomePhone",
        "selector": null,
        "value": null
      },
      "work_phone": {
        "type": "phone",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "WorkPhone",
        "selector": null,
        "value": null
      },
      "preferred_contact_method": {
        "type": "dropdown",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "ContactMethod",
        "selector": null,
        "value": null
      },
      "amount": {
        "type": "number",
        "locator": "query",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": "#txtTotalDeposit, #txtRequestCreditLimit, #txtLoanAmount, #txtLoanRequestAmount, #txtProposedLoanAmount",
        "value": null
      },
      "finish_later": {
        "type": "bool",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "new_member_application": {
        "type": "bool",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "type",
        "selector": null,
        "value": null
      },
      "youth_account": {
        "type": "bool",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "saAccountCode",
        "selector": null,
        "value": null
      },
      "business_application": {
        "type": "bool",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "line_of_credit": {
        "type": "bool",
        "locator": "query",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": "#hdIsLineOfCredit",
        "value": null
      },
      "eligibility": {
        "type": "string",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "FOMName",
        "selector": null,
        "value": null
      },
      "deposit_products": {
        "type": "enum",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "SelectedProducts",
        "selector": null,
        "value": null
      },
      "application_purpose": {
        "type": "string",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "LoanPurpose",
        "selector": null,
        "value": null
      },
      "credit_card_name": {
        "type": "string",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "CreditCardName",
        "selector": null,
        "value": null
      },
      "vehicle_type": {
        "type": "string",
        "locator": "function",
				"function": "getCurrentAppInfo",
        "objectLocation": "root",
        "objectPropertyName": "VehicleType",
        "selector": null,
        "value": null
      },
      "furthest_step_viewed": {
        "type": "string",
        "locator": "function",
				"function": "currentURL",
        "objectLocation": "root",
        "objectPropertyName": "stage",
        "selector": null,
        "value": "Product Information"
      },
      "hs_utm_campaign": {
        "type": "string",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "hs_utm_content": {
        "type": "string",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "hs_utm_medium": {
        "type": "string",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "hs_utm_source": {
        "type": "string",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      },
      "hs_utm_term": {
        "type": "string",
        "locator": "default",
        "function": null,
        "objectLocation": null,
        "objectPropertyName": null,
        "selector": null,
        "value": null
      }
    }

    this.appType = type;
    // TODO: Update the portal ID to match the client HubSpot portal ID.
    this.portalID = "";
    this.customEventName = `pe${this.portalID}_online_application_progress`;
    
    this.cookieName = 'persistent_id_' + this.appType;
    this.contactIdentified = false;

    // Create persistent ID and set cookie
    this.setPersistentId();

    // Initialize Fields property values with query parameters
    this.queryParameterPrefill();

    // Start interval to update field values every minute
    this.intervalID = setInterval(
        this.updateFieldValues.bind(this),
        60000
    );

    // Create event listener for next button
    this.createNextButtonEventListener();

    // CUSTOM (MeridianLink): DOM Observer event listener for Application Number
    const domObserver = new MutationObserver((_mutationList, observer) => {
      const appNumber = document.getElementById('hdloanDtl');
    
      if (appNumber) {
        this.updateFieldValues();

        observer.disconnect();
      }
    });
    domObserver.observe(document.body, { childList: true, subtree: true });
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
    let persistentID = this.getCookie();

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
    const persistentID = applicationTypeID + "-" + window.crypto.randomUUID();
    const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
    const secure = location.protocol === 'https:' ? "; Secure" : "";
    
    document.cookie = this.cookieName + "=" + encodeURIComponent(persistentID) + "; path=/; " + expires + "; SameSite=Lax" + secure;
    
    return persistentID;
  }
  /*********************************/
  /*** End Persistent ID Methods ***/
  /*********************************/



  /*********************************************/
  /*** Start Query Parameter Prefill Methods ***/
  /*********************************************/

  // Maps query parameter values to field property values based on matching key and query paramter names
  queryParameterPrefill() {
    const utmParams = new URLSearchParams(window.location.search);

    for (const [key, value] of Object.entries(utmParams)) {
      if(key in this.fields) {
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
    var fieldsUpdated = false;
    var emailUpdated = false;

    for (const [key, field] of Object.entries(this.fields)) {
      const oldValue = field.value;
      let newValue = this.getFieldValue(field);

      // CUSTOM (MeridianLink): If the key is "youth_account", map the value from "MINOR" to "Yes"
      if (key === "youth_account" && newValue === "MINOR") {
        newValue = "Yes";
      }

      // if the value has changed and the new value is not null or undefined, update the field value
      if (newValue !== null && newValue !== undefined && newValue !== "" && newValue !== oldValue) {
        field.value = newValue;

        // If the field is an email and the email is known, identify the HubSpot contact
        if (key == "email" && !this.contactIdentified) {
          emailUpdated = true;
        }

        fieldsUpdated = true;
      }
    };

    if (emailUpdated) {
      this.identifyHubSpotContact();
    }

    if (this.contactIdentified && fieldsUpdated) {
      if (this.appSubmitted()) {
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
    var value = null;
    var object = null;

    if (field.locator === "function" || field.locator === "object") {
      if (field.locator === "function") {
        if (typeof window[field.function] === "function") {
          object = window[field.function]();
        } else if (typeof field.function === "function") {
          object = this.executeFunction(field.function);
        } else {
          console.warn(`Function ${field.function} not found.`);
        }
      } else if (object || field.locator === "object") {
        if (field.objectLocation && field.objectPropertyName) {
          object = window[field.objectLocation] || field.objectLocation;
        }
      } 

      if (object && field.objectPropertyName in object) {
        // CUSTOM (MeridianLink): If the objectPropertyName is SelectedProducts, parse the JSON string to an array and map it to an array of productCodes
        // If the objectPropertyName is stage, compare the old value to the new value and choose the value with greatest value as determined by the
        // stagePath object.
        if (field.objectPropertyName === "SelectedProducts" && typeof object[field.objectPropertyName] === "string") {
          try {
            value = JSON.parse(object[field.objectPropertyName]).map(product => product.productCode);
          } catch (error) {
            console.error(`Error parsing SelectedProducts: ${error}`);
            value = null;
          }
        } else if (field.objectPropertyName === "stage" && typeof object[field.objectPropertyName] === "string") {
          // TODO: Update the stagePath object to match the stages in the POS
          let stagePath = {
            "Product Information": 1,
            "Applicant Information": 2,
            "Review and Submit": 3,
            "Application Completed": 4
          }

          const oldValue = this.fields.furthest_step_viewed.value;
          const newValue = object[field.objectPropertyName];
          if (stagePath[newValue] > stagePath[oldValue]) {
            value = newValue;
          } else {
            value = oldValue;
          }
        } else {
          value = object[field.objectPropertyName];
        }
      }
    } else if (field.locator === "query") {
      const element = document.querySelector(field.selector);

      if (element) {
        value = element.value || element.innerText;
      }
    }

    return this.formatFieldValue(value, field.type);
  }

  // TODO: Update functions to execute that do not exist in the window object
  executeFunction(func) {
    if (func === "getCurrentAppInfo") {
      // Assuming getCurrentAppInfo is a function that returns the current application info
      return getCurrentAppInfo();
    } else if (func === "currentURL") {
      // Assuming currentURL is a function that returns the current URL
      return currentURL().trackedURL;
    }
  }

  formatFieldValue(value, type) {
    
    if (value) {
      if (type === "number") {
        value = this.convertToNumber(value);
      } else if (type === "bool") {
        value = this.convertToBool(value);
      } else if (type === "enum") {
        value = this.convertToEnum(value);
      } else if (type === "dropdown") {
        value = value.toString().trim().toLowerCase();
      } else if (type === "string") {
        value = this.titleCase(value.toString().trim());
      } else if (type === "phone") {
        // Assuming phone numbers are formatted as strings
        value = "+1" + value.toString().replace(/\D/g, ''); // Remove non-digit characters
      }
    }

    return value;
  }

  // Helper function to convert a string to a number, or return null if conversion fails
  convertToNumber(value) {
    var newValue = null;

    if (value && typeof value === 'string') {
      // Remove any extra spaces and potential dollar signs or commas
      newValue = parseFloat(value.replace(/^\$\s*/, '').replace(/,/g, ''));
    }

    return isNaN(newValue) ? null : newValue;
  }

  // Helper function to convert a string to a number, or return null if conversion fails
  convertToBool(value) {
    var newValue = null;

    if (value) {
      var newValue = value.toString().toLowerCase();

      if (newValue === "true" || newValue === "1" || newValue === "yes" || newValue === "y") {
        newValue = "true";
      } else {
        newValue = "false";
      }
    }

    return newValue;
  }

  // Helper function to convert an array to a semicolon delimitted list, or return null if conversion fails
  convertToEnum(array) {
    var newValue = null;

    if (Array.isArray(array)) {
      const initialValue = "";
      newValue = array.reduce(
        (accumulator, currentValue) => accumulator + ";" + currentValue,
        initialValue,
      );
      newValue = newValue.substring(1);
    }

    return newValue;
  }

  titleCase(string) {
    if (!string) return string;
    return string.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  identifyHubSpotContact () {
    var _hsq = window._hsq = window._hsq || [];
    var email = this.fields.email.value;
    var first_name = this.fields.first_name.value;
    var last_name = this.fields.last_name.value;

    _hsq.push(["identify",{
        email: email,
        firstname: first_name,
        lastname: last_name
    }]); 

    this.contactIdentified = true;
  }

  appSubmitted() {
    // TODO: Update application submitted logic to determine if the application has been submitted.
    const currentURL = this.executeFunction("currentURL");

    return currentURL.includes("application-completed");
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

  closeApplication() {
    this.resetPersistentId();
    clearInterval(this.intervalID)
  }

  /**************************************/
  /*** End Update Field Value Methods ***/
  /**************************************/



  /***************************************/
  /*** Start Next Button Event Methods ***/
  /***************************************/

  createNextButtonEventListener() {
    // TODO: Update the selector to match the next button in the POS
    const nextButton = document.querySelectorAll(".div-continue-button");
    if (nextButton.length > 0) {
      nextButton.forEach(button => {
        button.addEventListener("click", this.handleNextButtonClick.bind(this));
      });
    } else {
      console.warn("Next button not found. Please check the selector.");
    }
  }

  handleNextButtonClick(event) {
    // Update field values
    this.updateFieldValues();
  }
  /*************************************/
  /*** End Next Button Event Methods ***/
  /*************************************/



  /**********************************/
  /*** Start Custom Event Methods ***/
  /**********************************/
  sendCustomEvent() {    
    var _hsq = window._hsq = window._hsq || [];
    const properties = this.getCustomEventProperties();

    _hsq.push(["trackCustomBehavioralEvent", {
        name: this.customEventName,
        properties: properties
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

  // TODO: Update DOM selector to obtain application type.
  // TODO: Update mapAppType keys to match internal application type names.
  let loanType = document.getElementById("hdnLoanType") || document.getElementById("hdLoanType");
  if (!loanType) return null;

  let mapAppType = {
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

  let appType = mapAppType[loanType.value];

  if (appType) {
    return new Application(appType);
  } else {
    return null;
  }
};

export const gha_application = initApplication();