// =============================================================================
// MERIDIANLINK LOANSPQ — READY-TO-USE BASELINE
// =============================================================================
// This is the confirmed-working starting point for a NEW LoansPQ client.
// Everything below has been proven across multiple live LoansPQ
// implementations. For a normal new client, you should only need to touch
// the two items in the checklist below — nothing else in this file should
// need structural changes.
//
// NEW CLIENT SETUP CHECKLIST (the only things that normally change):
//   1. Set this.portalID in the constructor to the client's HubSpot portal ID.
//   2. In initApplication() at the bottom, confirm which application types
//      (XA/PL/VL/CC/HE, etc.) this client actually offers online, and
//      trim/extend mapAppType accordingly. Commercial types are left as
//      placeholder codes since no client has confirmed live commercial
//      applications through LoansPQ yet — if this client does, confirm the
//      actual hdLoanType/hdnLoanType values before relying on them (see the
//      warning comment on mapAppType below).
//
// If something below doesn't match this client's instance (e.g. a DOM
// selector genuinely doesn't exist on their pages), that's worth flagging as
// a real deviation worth investigating — LoansPQ is a shared, templated
// platform across clients, so a mismatch usually means either a
// customization on this client's build or a version difference, not that
// this baseline is wrong.
// =============================================================================

export default class Application {
  constructor(type) {
    this.fields = {
      application_session_id: {
        type: "string",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      application_pseudo_id: {
        type: "string",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      application_id: {
        type: "string",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: "#hdloanDtl",
        value: null,
      },
      application_type: {
        type: "string",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: type,
      },
      first_name: {
        type: "string",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "FirstName",
        selector: null,
        value: null,
      },
      last_name: {
        type: "string",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "LastName",
        selector: null,
        value: null,
      },
      // type "email" (see formatFieldValue()) just lowercases and trims,
      // matching how email addresses should actually be normalized in HubSpot.
      email: {
        type: "email",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "EmailAddr",
        selector: null,
        value: null,
      },
      cell_phone: {
        type: "phone",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "MobilePhone",
        selector: null,
        value: null,
      },
      home_phone: {
        type: "phone",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "HomePhone",
        selector: null,
        value: null,
      },
      work_phone: {
        type: "phone",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "WorkPhone",
        selector: null,
        value: null,
      },
      preferred_contact_method: {
        type: "dropdown",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "ContactMethod",
        selector: null,
        value: null,
      },
      // See the key === "amount" special case in getFieldValue() — resolved
      // primarily via getCurrentAppInfo() properties (confirmed per
      // application type: LoanAmount for PL — including every purpose value
      // under PL, e.g. "Line of Credit" — ProposedLoanAmount for VL,
      // RequestedLoanAmount for HE, RequestAmount for CC's requested credit
      // limit, and a sum across SelectedProducts for deposit (XA)
      // applications). The DOM selector list below is a defensive fallback
      // only, not expected to be needed in normal operation.
      amount: {
        type: "number",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector:
          "#txtTotalDeposit, #txtRequestCreditLimit, #txtLoanAmount, #txtLoanRequestAmount, #txtProposedLoanAmount",
        value: null,
      },
      // No confirmed trigger exists for this yet on any LoansPQ
      // implementation to date — if this client's flow has an explicit
      // "save and finish later" action (distinct from just closing the
      // tab), it needs its own event listener setting this value; otherwise
      // it will remain permanently empty, which is expected.
      finish_later: {
        type: "bool",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      new_member_application: {
        type: "bool",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "type",
        selector: null,
        value: null,
      },
      // See the saAccountCode special case in getFieldValue() — maps the
      // raw "MINOR" value to "true"/"false" before formatFieldValue() runs,
      // not after (see that special case's comment for why order matters
      // here).
      youth_account: {
        type: "bool",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "saAccountCode",
        selector: null,
        value: null,
      },
      // No LoansPQ client has confirmed live online business/commercial
      // applications to date — this will remain null unless that changes.
      // Kept in the data model rather than removed so nothing else needs to
      // change if a client later brings business applications online.
      business_application: {
        type: "bool",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      line_of_credit: {
        type: "bool",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: "#hdIsLineOfCredit",
        value: null,
      },
      eligibility: {
        type: "string",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "FOMName",
        selector: null,
        value: null,
      },
      // Free-text string Deal property (not a HubSpot enumeration), by
      // design — avoids the enum-maintenance overhead of a client's deposit
      // product list changing over time. See the label lookup logic in
      // getFieldValue() below: pulls the internal productCode from
      // SelectedProducts, then resolves a human-readable name via the
      // page's own product catalog global (window.PRODUCTLIST /
      // NORMALPRODUCTLIST). "enum" as the type here only controls the
      // array-to-semicolon-delimited-string join — it does not mean this
      // maps to an actual HubSpot enumeration property.
      deposit_products: {
        type: "enum",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "SelectedProducts",
        selector: null,
        value: null,
      },
      // Same free-text reasoning as deposit_products. Uses "raw_string" (see
      // formatFieldValue()), not "string" — MeridianLink already returns
      // this correctly formatted/cased (e.g. "Adjustable Rate HELOC"), and
      // titleCase() would mangle acronyms like HELOC into "Heloc".
      application_purpose: {
        type: "raw_string",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "LoanPurpose",
        selector: null,
        value: null,
      },
      credit_card_name: {
        type: "string",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "CreditCardName",
        selector: null,
        value: null,
      },
      vehicle_type: {
        type: "string",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "VehicleType",
        selector: null,
        value: null,
      },
      // See the "stage" special case in getFieldValue() — forces
      // "Application Completed" whenever appSubmitted() is true, regardless
      // of what MeridianLink's own .stage value returns (that value has
      // been observed getting stuck at "Review and Submit" on genuinely
      // completed applications).
      furthest_step_viewed: {
        type: "string",
        locator: "function",
        function: "currentURL",
        objectLocation: "root",
        objectPropertyName: "stage",
        selector: null,
        value: "Product Information",
      },
      hs_utm_campaign: {
        type: "string",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      hs_utm_content: {
        type: "string",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      hs_utm_medium: {
        type: "string",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      hs_utm_source: {
        type: "string",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      hs_utm_term: {
        type: "string",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      // Always present in the event payload, never used to gate
      // whether an event sends (see updateFieldValues() below)
      // No Deal property equivalent, used only as enrollment criteria on the
      // HubSpot deal upsert workflow, to avoid creating unactionable
      // records before a contact is identified.
      contact_identified: {
        type: "bool",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: "false",
      },
      // Distinct, stable identifier from application_id — see field comment
      // history for why: gives a downstream workflow a simple flag to key a
      // deal-stage update off of, independent of whatever shape
      // application_id ends up in.
      submitted: {
        type: "bool",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: "false",
      },
    };

    this.appType = type;
    // TODO: set this to the client's HubSpot portal ID.
    this.portalID = "";
    this.customEventName = `pe${this.portalID}_online_application_progress`;

    this.cookieName = "persistent_id_" + this.appType;
    this.submittedFlagCookieName = "app_submitted_" + this.appType;
    this.contactIdentifiedCookieName = "contact_identified_" + this.appType;
    // Rides along on every event from the start, as "false" by default —
    // never used to gate whether an event sends. Flips to "true" at some
    // point and stays that way; see updateFieldValues() and
    // identifyHubSpotContact().
    this.contactIdentified = false;
    // Same always-present pattern as contactIdentified — see
    // updateFieldValues() and appSubmitted().
    this.isSubmitted = false;
    // Idempotency guard for closeApplication() — prevents that method's
    // cookie writes/interval clear from re-running on a later pass, since
    // submitted deliberately stays true after the fact.
    this.applicationClosed = false;
    // Plain in-memory dedup guard for sendCustomEvent() — safe as long as
    // only one Application instance exists per page load (see the
    // singleton guard in initApplication()).
    this.lastSentPayload = null;

    // Create persistent ID and set cookie
    this.setPersistentId();

    // Initialize Fields property values with query parameters
    this.queryParameterPrefill();

    // FIX (from Leaders lessons learned): check for an existing contact_identified
    // cookie on init. The Application instance can be recreated on a later page
    // load within the same session (in-memory state resets to false each time),
    // so without this check a later event — including the final submission event —
    // could go out missing contact_identified even though the contact was already
    // identified earlier in the session, causing the deal upsert workflow to fail
    // enrollment.
    if (this.getContactIdentifiedCookie()) {
      this.contactIdentified = true;
      this.fields.contact_identified.value = "true";
    }

    // Start interval to update field values every minute
    this.intervalID = setInterval(this.updateFieldValues.bind(this), 60000);

    // Create event listener for next button
    this.createNextButtonEventListener();

    // Waits for the application number element to exist AND have a
    // non-empty value before disconnecting — closing out on element
    // existence alone risked firing before the application number was ever
    // actually assigned.
    const domObserver = new MutationObserver((_mutationList, observer) => {
      const appNumberElement = document.getElementById("hdloanDtl");
      const appNumber = appNumberElement ? `${appNumberElement.value}` : null;

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

  // Returns the persistent ID based on the application type
  // If the persistent ID and cookie does not exist, it creates a new one
  createPersistentId() {
    let persistentID = this.getCookie();

    if (!persistentID) {
      if (this.appType !== "unknown") {
        persistentID = this.setPersistentIDCookie(this.appType);
      }
    }

    return persistentID;
  }

  // Returns the cookie based on the cookie name
  getCookie() {
    const match = document.cookie.match(
      new RegExp("(^| )" + this.cookieName + "=([^;]+)")
    );

    if (match) {
      return decodeURIComponent(match[2]);
    }

    return null;
  }

  // Creates a persistent ID cookie with the application type ID and a random UUID
  setPersistentIDCookie(applicationTypeID) {
    const persistentID = applicationTypeID + "-" + window.crypto.randomUUID();
    const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
    const secure = location.protocol === "https:" ? "; Secure" : "";

    document.cookie =
      this.cookieName +
      "=" +
      encodeURIComponent(persistentID) +
      "; path=/; " +
      expires +
      "; SameSite=Lax" +
      secure;

    return persistentID;
  }

  // Does NOT get called from closeApplication() — clearing the session
  // cookie on submission caused any subsequent page load to generate a new
  // session ID and a duplicate deal. Kept only for reference/rollback.
  resetPersistentId() {
    document.cookie = this.cookieName + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  setSubmittedFlagCookie() {
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 24 hours
    const secure = location.protocol === "https:" ? "; Secure" : "";

    document.cookie =
      this.submittedFlagCookieName +
      "=true; path=/; expires=" +
      expires.toUTCString() +
      "; SameSite=Lax" +
      secure;
  }

  // FIX (from Leaders lessons learned): persist contact_identified via cookie so
  // this state survives the Application instance being recreated on subsequent
  // page loads within the same session (in-memory state alone is not reliable —
  // see constructor note above).
  setContactIdentifiedCookie() {
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 24 hours
    const secure = location.protocol === "https:" ? "; Secure" : "";

    document.cookie =
      this.contactIdentifiedCookieName +
      "=true; path=/; expires=" +
      expires.toUTCString() +
      "; SameSite=Lax" +
      secure;
  }

  getContactIdentifiedCookie() {
    const match = document.cookie.match(
      new RegExp("(^| )" + this.contactIdentifiedCookieName + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) === "true" : false;
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
      if (key in this.fields) {
        this.fields[key].value = value;
      }
    }
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
      let newValue = this.getFieldValue(field, key);

      // if the value has changed and the new value is not null or undefined, update the field value
      if (
        newValue !== null &&
        newValue !== undefined &&
        newValue !== "" &&
        newValue !== oldValue
      ) {
        field.value = newValue;

        // If email/first/last name are known, identify the HubSpot contact.
        // NOTE: this only controls whether identifyHubSpotContact() runs again —
        // it is intentionally NOT used to gate sendCustomEvent() below. Every
        // event fires regardless of contact_identified state; contact_identified
        // is only used as enrollment criteria on the HubSpot workflow side, not
        // as a client-side gate on what events get sent.
        if (
          (key === "email" || key === "first_name" || key === "last_name") &&
          !this.contactIdentified
        ) {
          emailUpdated = true;
        }

        fieldsUpdated = true;
      }
    }

    if (emailUpdated) {
      this.identifyHubSpotContact();
    }

    // Checked unconditionally on every pass, decoupled from whether any
    // other field happened to change this same pass — a genuine transition
    // here itself counts as a reason to send an event, so submission is
    // never missed just because nothing else changed at that exact moment.
    const contactIdentifiedValue = this.contactIdentified ? "true" : "false";
    if (this.fields.contact_identified.value !== contactIdentifiedValue) {
      this.fields.contact_identified.value = contactIdentifiedValue;
      fieldsUpdated = true;
    }

    // FIX (from Leaders lessons learned): require both appSubmitted() AND a
    // known application_id before closing out tracking. Closing out on
    // appSubmitted() alone risked firing before the application number was
    // ever captured.
    if (
      !this.isSubmitted &&
      this.appSubmitted() &&
      this.fields.application_id.value
    ) {
      this.isSubmitted = true;
    }
    const submittedValue = this.isSubmitted ? "true" : "false";
    if (this.fields.submitted.value !== submittedValue) {
      this.fields.submitted.value = submittedValue;
      fieldsUpdated = true;
    }

    if (fieldsUpdated) {
      // submitted deliberately keeps riding along as true on any further
      // browsing after submission — guard pseudo ID creation with "hasn't
      // already been set" so a later pass doesn't overwrite its baked-in
      // submission date.
      if (this.isSubmitted && !this.fields.application_pseudo_id.value) {
        this.createPseudoId();
      }

      this.sendCustomEvent();

      // closeApplication() has its own idempotency guard (applicationClosed)
      // for the same reason — see closeApplication() comment.
      if (this.isSubmitted) {
        this.closeApplication();
      }
    }
  }

  // Retrieves the value of a field based on its locator type
  // If the field is an object, it retrieves the value from the object property
  // If the field is a query, it retrieves the value from a querySelector
  getFieldValue(field, key) {
    var value = null;
    var object = null;

    // Resolved primarily via getCurrentAppInfo() — see field comment above
    // for the confirmed property per application type. Falls back to the
    // DOM selector chain only if nothing usable is found there.
    if (key === "amount") {
      const appInfo =
        typeof getCurrentAppInfo === "function" ? getCurrentAppInfo() : null;

      // Deposit (XA) applications: amount is the sum of each selected
      // product's individual depositAmount inside SelectedProducts, not a
      // single property. Guarding on > 0 avoids returning a misleading 0
      // when nothing has been entered yet.
      if (appInfo && typeof appInfo.SelectedProducts === "string") {
        try {
          const selectedProducts = JSON.parse(appInfo.SelectedProducts);
          const totalDepositAmount = selectedProducts.reduce(
            (sum, product) => sum + (Number(product.depositAmount) || 0),
            0
          );
          if (totalDepositAmount > 0) {
            return this.formatFieldValue(
              totalDepositAmount,
              field.type,
              field.options
            );
          }
        } catch (error) {
          console.error(`Error parsing SelectedProducts for amount: ${error}`);
        }
      }

      const amountProperties = [
        "LoanAmount",
        "ProposedLoanAmount",
        "RequestedLoanAmount",
        "RequestAmount",
      ];
      for (const prop of amountProperties) {
        if (appInfo && appInfo[prop]) {
          return this.formatFieldValue(appInfo[prop], field.type, field.options);
        }
      }
      return this.formatFieldValue(
        this.getQuerySelectorValue(field.selector),
        field.type,
        field.options
      );
    }

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
        if (
          field.objectPropertyName === "SelectedProducts" &&
          typeof object[field.objectPropertyName] === "string"
        ) {
          try {
            const selectedProducts = JSON.parse(
              object[field.objectPropertyName]
            );

            // --- DEPOSIT PRODUCTS: CODE vs. LABEL — TOGGLE BLOCK ---
            // If a client uses an enumerator property instead of free-text:
            //   1. Uncomment the line below (raw productCode array).
            //   2. Comment out the label lookup block after it.
            // value = selectedProducts.map((product) => product.productCode);

            const productCatalog =
              window.NORMALPRODUCTLIST || window.PRODUCTLIST || [];
            value = selectedProducts.map((product) => {
              const catalogMatch = productCatalog.find(
                (catalogProduct) =>
                  catalogProduct.ProductCode === product.productCode
              );
              return catalogMatch
                ? catalogMatch.ProductName
                : product.productCode;
            });
            // --- END LABEL LOOKUP BLOCK ---
          } catch (error) {
            console.error(`Error parsing SelectedProducts: ${error}`);
            value = null;
          }
        } else if (
          field.objectPropertyName === "stage" &&
          typeof object[field.objectPropertyName] === "string"
        ) {
          let stagePath = {
            "Product Information": 1,
            "Applicant Information": 2,
            "Review and Submit": 3,
            "Application Completed": 4,
          };

          const oldValue = this.fields.furthest_step_viewed.value;
          const newValue = object[field.objectPropertyName];

          // Forces "Application Completed" whenever appSubmitted() is true,
          // regardless of what .stage returns — always safe, since
          // "Application Completed" is the highest stage and this can
          // never regress the field to an earlier one.
          if (this.appSubmitted()) {
            value = "Application Completed";
          } else if (stagePath[newValue] > stagePath[oldValue]) {
            value = newValue;
          } else {
            value = oldValue;
          }
        } else if (field.objectPropertyName === "saAccountCode") {
          // Must run here, on the raw value, before formatFieldValue()'s
          // convertToBool() would otherwise lowercase "MINOR" to "minor"
          // and silently resolve it to "false" (not matching any of
          // convertToBool()'s truthy strings). Outputs "true"/"false"
          // directly — the Deal checkbox property's internal values are
          // lowercase "true"/"false", not "Yes"/"No".
          value =
            object[field.objectPropertyName] === "MINOR" ? "true" : "false";
        } else {
          value = object[field.objectPropertyName];
        }
      }
    } else if (field.locator === "query") {
      value = this.getQuerySelectorValue(field.selector);
    }

    return this.formatFieldValue(value, field.type, field.options);
  }

  // Splits a comma-separated selector list and tries each individually, in
  // the order listed, taking the first one with an actual non-empty value —
  // not just the first one present in the DOM. A plain
  // document.querySelector(selectorList) call returns whichever match comes
  // first in DOM order, which silently breaks when a page has a legacy or
  // hidden duplicate field sharing a selector with the real one.
  getQuerySelectorValue(selectorString) {
    const selectors = selectorString.split(",").map((s) => s.trim());
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const candidateValue = element.value || element.innerText;
        if (candidateValue) {
          return candidateValue;
        }
      }
    }
    return null;
  }

  executeFunction(func) {
    if (func === "getCurrentAppInfo") {
      return getCurrentAppInfo();
    } else if (func === "currentURL") {
      return currentURL().trackedURL;
    }
  }

  formatFieldValue(value, type, options) {
    if (value) {
      if (type === "number") {
        value = this.convertToNumber(value);
      } else if (type === "bool") {
        value = this.convertToBool(value);
      } else if (type === "enum") {
        value = this.convertToEnum(value);
      } else if (type === "dropdown") {
        value = value.toString().trim().toLowerCase();
        if (options && !options.includes(value)) value = null;
      } else if (type === "raw_string") {
        // Passthrough: trim only, no title-casing. For fields the source
        // system already returns correctly formatted/cased.
        value = value.toString().trim();
      } else if (type === "email" || type === "lowercase_string") {
        // Lowercase + trim only — no title-casing. Used for fields that HubSpot
        // expects to be normalized to lowercase (e.g. email addresses).
        value = value.toString().trim().toLowerCase();
      } else if (type === "string") {
        value = this.titleCase(value.toString().trim());
      } else if (type === "phone") {
        value = "+1" + value.toString().replace(/\D/g, "");
      }
    }

    return value;
  }

  // Helper function to convert a string to a number, or return null if conversion fails
  convertToNumber(value) {
    // Handles both string and raw number input — a plain
    // typeof value === "string" check alone silently returns null for a
    // raw JS number (e.g. one computed in code, like a summed total).
    if (value === null || value === undefined || value === "") return null;

    if (typeof value === "number") {
      return isNaN(value) ? null : value;
    }

    const parsed = parseFloat(value.toString().replace(/^\$\s*/, "").replace(/,/g, ""));
    return isNaN(parsed) ? null : parsed;
  }

  // Helper function to convert a string to a bool-as-string, or return null if conversion fails
  convertToBool(value) {
    var newValue = null;

    if (value) {
      newValue = value.toString().toLowerCase();

      if (
        newValue === "true" ||
        newValue === "1" ||
        newValue === "yes" ||
        newValue === "y"
      ) {
        newValue = "true";
      } else {
        newValue = "false";
      }
    }

    return newValue;
  }

  // Helper function to convert an array to a semicolon delimited list, or return null if conversion fails
  convertToEnum(array) {
    var newValue = null;

    if (Array.isArray(array)) {
      const initialValue = "";
      newValue = array.reduce(
        (accumulator, currentValue) => accumulator + ";" + currentValue,
        initialValue
      );
      newValue = newValue.substring(1);
    }

    return newValue;
  }

  titleCase(string) {
    if (!string) return string;
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  identifyHubSpotContact() {
    var email = this.fields.email.value;
    var first_name = this.fields.first_name.value;
    var last_name = this.fields.last_name.value;

    // Only identify contact and set contact_identified once email, first name,
    // and last name are all simultaneously known. This is used downstream as the
    // HubSpot deal upsert workflow's enrollment gate (to avoid unactionable or
    // nameless deal records) — it does NOT gate whether this event, or any
    // event, gets sent to HubSpot. See sendCustomEvent() / updateFieldValues().
    if (!email || !first_name || !last_name) {
      return;
    }

    var _hsq = (window._hsq = window._hsq || []);
    _hsq.push([
      "identify",
      {
        email: email,
        firstname: first_name,
        lastname: last_name,
      },
    ]);

    this.contactIdentified = true;
    this.fields.contact_identified.value = "true";
    this.setContactIdentifiedCookie();
  }

  appSubmitted() {
    const currentURL = this.executeFunction("currentURL");
    return currentURL.includes("application-completed");
  }

  // Creates a pseudo ID for the application
  // This is used as an alternate method to track the application progress in HubSpot
  // The pseudo ID combines application type, email, and submission date
  // Example: "consumer_deposit-john.doe@gmail.com-20231001"
  createPseudoId() {
    const email = this.fields.email.value;
    const submissionDate = new Date()
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
    const pseudoId = `${this.appType}-${email}-${submissionDate}`;

    this.fields.application_pseudo_id.value = pseudoId;
  }

  closeApplication() {
    // Idempotency guard — submitted deliberately keeps riding along as true
    // on further browsing after submission, so this method could otherwise
    // get re-triggered on a later pass.
    if (this.applicationClosed) return;
    this.applicationClosed = true;

    this.setSubmittedFlagCookie();
    clearInterval(this.intervalID);
  }
  /**************************************/
  /*** End Update Field Value Methods ***/
  /**************************************/

  /***************************************/
  /*** Start Next Button Event Methods ***/
  /***************************************/
  createNextButtonEventListener() {
    // Scoped to [data-role="footer"], not just .div-continue-button alone —
    // that class is also reused on popup/modal dialog buttons (e.g. "OK" on
    // a limit-exceeded dialog, "Remove"/"Cancel" on a product-removal
    // confirmation) that are NOT the real page-navigation button. Only the
    // real button sits inside a [data-role="footer"] container.
    // Uses direct addEventListener on the matched element(s), not event
    // delegation on document — delegation relies on the click bubbling up,
    // and if MeridianLink's own inline onclick validation handler calls
    // stopPropagation() before a delegated listener sees the event, the
    // handler never fires at all. Multiple listeners on the same element
    // are unaffected by stopPropagation(), which only blocks further
    // bubbling to ancestors.
    const nextButton = document.querySelectorAll(
      '[data-role="footer"] .div-continue-button'
    );
    if (nextButton.length > 0) {
      nextButton.forEach((button) => {
        button.addEventListener("click", this.handleNextButtonClick.bind(this));
      });
    } else {
      console.warn("Next button not found. Please check the selector.");
    }
  }

  handleNextButtonClick(event) {
    this.updateFieldValues();
  }
  /*************************************/
  /*** End Next Button Event Methods ***/
  /*************************************/

  /**********************************/
  /*** Start Custom Event Methods ***/
  /**********************************/
  sendCustomEvent() {
    // NOTE: intentionally unconditional — NOT gated by contactIdentified.
    // Every field-change event fires; contact_identified/submitted are
    // properties on the event, used as HubSpot workflow enrollment
    // criteria, not as a client-side gate on what gets sent.
    const properties = this.getCustomEventProperties();
    const serialized = JSON.stringify(properties);

    // Dedup guard: skip sending if this exact payload was just sent.
    // Plain in-memory — safe because only one Application instance ever
    // exists per page load (see the singleton guard in initApplication()).
    if (serialized === this.lastSentPayload) {
      return;
    }
    this.lastSentPayload = serialized;

    var _hsq = (window._hsq = window._hsq || []);
    _hsq.push([
      "trackCustomBehavioralEvent",
      {
        name: this.customEventName,
        properties: properties,
      },
    ]);
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
  // Singleton guard: refuses to construct a second Application instance if
  // this script somehow executes more than once for a single page load
  // (e.g. a GTM tag/trigger firing more than once). A real page navigation
  // naturally clears this, since window itself gets torn down.
  if (window.__onlineAppTrackingInstance) {
    return window.__onlineAppTrackingInstance;
  }

  let loanType = document.getElementById("hdnLoanType") || document.getElementById("hdLoanType");
  if (!loanType) return null;

  // TODO: confirm which of these this client actually offers online and
  // trim/extend accordingly — this is the main thing that varies per
  // client. Commercial types remain placeholder codes (no LoansPQ client
  // has confirmed live online business applications to date); if this
  // client does offer them, confirm the actual hdLoanType values before
  // relying on these numeric placeholders — a mismatch here means
  // mapAppType[loanType.value] silently misses and initApplication()
  // always returns null, with no error.
  let mapAppType = {
    XA: "consumer_deposit",
    PL: "consumer_loan",
    VL: "consumer_vehicle",
    CC: "consumer_credit_card",
    HE: "consumer_equity",
    6: "consumer_real_estate",
    7: "commercial_deposit",
    8: "commercial_loan",
    9: "commercial_vehicle",
    10: "commercial_credit_card",
    11: "commercial_equity",
    12: "commercial_real_estate",
  };

  let appType = mapAppType[loanType.value];

  if (appType) {
    // FIX (from Leaders lessons learned): check the submitted flag before
    // initializing. If the application was already submitted, skip
    // initialization entirely to prevent generating a new session ID and a
    // duplicate deal.
    const submittedFlagCookieName = "app_submitted_" + appType;
    const submittedMatch = document.cookie.match(
      new RegExp("(^| )" + submittedFlagCookieName + "=([^;]+)")
    );
    if (submittedMatch && decodeURIComponent(submittedMatch[2]) === "true") {
      console.log(
        "[MeridianLink LoansPQ Tracking] Application already submitted, skipping initialization."
      );
      return null;
    }

    return (window.__onlineAppTrackingInstance = new Application(appType));
  } else {
    return null;
  }
}

export const gha_application = initApplication();