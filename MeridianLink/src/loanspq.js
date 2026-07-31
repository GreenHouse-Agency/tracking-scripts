export default class Application {
  constructor(type) {
    // TODO: Update locator, function, objectLocation, objectPropertyName, and selector
    // based on the location of each field in the POS.
    // NOTE: deposit_products and application_purpose have additional guidance in
    // their inline comments below — both are intended to land as free-text string
    // Deal properties (not HubSpot enumerations) to avoid enum-maintenance overhead
    // as a client's product/purpose lists change over time. Review those two
    // fields' comments closely even after completing the rest of the TODOs.
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
      email: {
        type: "string",
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
      youth_account: {
        type: "bool",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "saAccountCode",
        selector: null,
        value: null,
      },
      // TODO: If this client does not offer business/commercial applications
      // online, this will always remain null — that's expected, kept in the data
      // model for consistency with the standard template rather than removed.
      // If they do, confirm the locator/selector needed to detect it.
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
      // DEPOSIT PRODUCTS
      // This template sends deposit_products as a free-text string property on
      // the Deal (not a HubSpot enumeration), to avoid the enum-maintenance
      // overhead of a client adding/changing deposit products over time (enum
      // option values requiring manual updates whenever a product list changes
      // is a recurring pain point — see lessons learned). See the label lookup
      // logic in getFieldValue() below for how a human-readable name is resolved
      // from the internal productCode. "enum" as the type here just controls the
      // internal array-to-delimited-string join (convertToEnum) — it does not
      // mean this maps to an actual HubSpot enumeration property.
      // TODO: Confirm this client's platform exposes a page-scoped product
      // catalog global (e.g. PRODUCTLIST/NORMALPRODUCTLIST, as seen in
      // MeridianLink LoansPQ) that can be used to resolve productCode -> label.
      // If not, an alternate label source will need to be identified, or this
      // may need to fall back to sending the raw productCode (see toggle block
      // in getFieldValue() below).
      deposit_products: {
        type: "enum",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "SelectedProducts",
        selector: null,
        value: null,
      },
      // LOAN PURPOSE
      // Like deposit_products, this template sends application_purpose as a
      // free-text string property (not a HubSpot enumeration), for the same
      // enum-maintenance reasons.
      // TODO: Before assuming "raw_string" (see formatFieldValue()) is correct
      // here, confirm via console (getCurrentAppInfo().LoanPurpose) whether this
      // client's platform already returns the value correctly formatted/cased
      // (e.g. "Adjustable Rate HELOC"). "raw_string" skips titleCase() entirely,
      // which is only safe if the source system's casing can be trusted —
      // titleCase() would otherwise mangle acronyms (e.g. "HELOC" -> "Heloc").
      // If the source value is inconsistent or needs cleanup, use "string"
      // instead so titleCase() still applies.
      //
      // POSSIBLE FUTURE ITEM: if this client has (or later adds) a back-end
      // core/reporting integration that expects a specific casing or internal
      // code for Loan Purpose — as seen with some clients' enum-based setups,
      // where option values were forced into specific casing to match a
      // back-end file import — this will need to be revisited even if
      // "raw_string" is confirmed correct today.
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
      // contact_identified always rides along in the event payload (see
      // sendCustomEvent()/updateFieldValues() below — sending is never gated by
      // this value). It exists so the HubSpot deal upsert workflow can use it as
      // an enrollment criterion, keeping unactionable/nameless deals from being
      // created, without the tracking code itself withholding any events.
      contact_identified: {
        type: "bool",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      // NEW: simple boolean flag, distinct from application_id, that flips to
      // "true" once the application is confirmed submitted (see updateFieldValues()
      // below — set at the same point closeApplication() fires). Not part of any
      // existing LoansPQ implementation, added specifically as a stable identifier
      // to key a secondary deal-stage-update workflow off of, independent of
      // whatever shape application_id ends up in. Pattern (plain boolean, no date
      // math) borrowed from the CCFCU SymApp implementation's `submitted` field,
      // not from the submitted_date/Date.UTC() approach used in Access/Fintilect.
      submitted: {
        type: "bool",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
    };

    this.appType = type;
    // TODO: Update the portal ID to match the client HubSpot portal ID.
    this.portalID = "";
    this.customEventName = `pe${this.portalID}_meridianlink_application_progress`;

    this.cookieName = "persistent_id_" + this.appType;
    this.submittedFlagCookieName = "app_submitted_" + this.appType;
    this.contactIdentifiedCookieName = "contact_identified_" + this.appType;
    this.contactIdentified = false;
    // Mirrors contactIdentified's in-memory persistence pattern: once true, stays
    // true for the life of this Application instance, so it keeps riding along
    // on every subsequent event (including any browsing after submission, before
    // the session/tab closes). No cookie needed here the way contactIdentified
    // has one — once submitted, initApplication() skips creating any new
    // Application instance on future page loads (see submittedFlagCookieName
    // check below), so there's no "instance recreated mid-session" case to guard
    // against for this flag specifically.
    this.submitted = false;

    // Tracks the last sent event payload to guard against duplicate sends
    // (e.g. page postbacks/reloads without a genuine field change).
    this.lastSentPayload = null;

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

    // Create persistent ID and set cookie
    this.setPersistentId();

    // Initialize Fields property values with query parameters
    this.queryParameterPrefill();

    // Start interval to update field values every minute
    this.intervalID = setInterval(this.updateFieldValues.bind(this), 60000);

    // Create event listener for next button
    this.createNextButtonEventListener();

    // FIX (from Leaders lessons learned): the DOM observer previously disconnected
    // as soon as the application number element existed in the DOM, even if its
    // value was still empty — closing out tracking before the application number
    // was actually known. Now explicitly waits for a non-empty value before
    // disconnecting.
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

  // FIX (from Leaders lessons learned): set a short-lived flag cookie on submission
  // instead of clearing the session cookie via resetPersistentId(). Clearing the
  // session cookie on submission caused any subsequent page load/navigation to
  // generate a new session ID and a duplicate deal.
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

  getSubmittedFlagCookie() {
    const match = document.cookie.match(
      new RegExp("(^| )" + this.submittedFlagCookieName + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) === "true" : false;
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

  // Kept for reference/rollback purposes only — no longer called from
  // closeApplication(). See setSubmittedFlagCookie() fix note above.
  resetPersistentId() {
    document.cookie =
      this.cookieName + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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
    // Ensure contact_identified always reflects the current state
    if (this.contactIdentified) {
      this.fields.contact_identified.value = "true";
    }

    // Ensure submitted always reflects the current state, same pattern as
    // contact_identified above — rides along on every event once true, not just
    // the one event where it first flips.
    if (this.submitted) {
      this.fields.submitted.value = "true";
    }

    var fieldsUpdated = false;
    var emailUpdated = false;

    for (const [key, field] of Object.entries(this.fields)) {
      const oldValue = field.value;
      let newValue = this.getFieldValue(field);

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

    if (fieldsUpdated) {
      // FIX (from Leaders lessons learned): require both appSubmitted() AND a
      // known application_id before closing out tracking. Closing out on
      // appSubmitted() alone risked firing before the application number was
      // ever captured.
      if (this.appSubmitted() && this.fields.application_id.value) {
        // Set submitted at the same point closeApplication() fires, so the final
        // submission event carries both the application_id and this flag together.
        // Setting this.submitted (not just the field value) ensures it keeps
        // getting reasserted on every subsequent event via the check at the top
        // of this function, same as contactIdentified.
        this.submitted = true;
        this.fields.submitted.value = "true";
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
        if (
          field.objectPropertyName === "SelectedProducts" &&
          typeof object[field.objectPropertyName] === "string"
        ) {
          try {
            const selectedProducts = JSON.parse(
              object[field.objectPropertyName]
            );

            // ============================================================
            // DEPOSIT PRODUCTS: CODE vs. LABEL — TOGGLE BLOCK
            //
            // This template defaults to sending deposit_products as a
            // free-text string Deal property (not a HubSpot enumeration) —
            // see field comment above for why.
            //
            // IF THIS CLIENT USES AN ENUMERATOR PROPERTY INSTEAD:
            //   1. UNCOMMENT the "ENUMERATOR VALUES" block below (raw
            //      productCode array — the original/standard LoansPQ
            //      template approach).
            //   2. COMMENT OUT the "LABEL LOOKUP" block below it.
            // ============================================================

            // --- UNCOMMENT IF USING ENUMERATOR VALUES (internal codes) ---
            // value = selectedProducts.map((product) => product.productCode);

            // --- COMMENT OUT IF USING ENUMERATOR VALUES ---
            // LABEL LOOKUP: cross-reference each selected product's internal
            // code against the page's own product catalog global (e.g.
            // window.PRODUCTLIST / window.NORMALPRODUCTLIST in MeridianLink
            // LoansPQ — TODO: confirm the exact global name/shape on this
            // client's instance) to resolve a human-readable ProductName.
            // Falls back to the raw code if no catalog match is found, so a
            // value is never silently dropped (e.g. if the catalog global
            // isn't loaded yet at the moment this runs).
            // TODO: if this client's platform exposes more than one catalog
            // global (e.g. a filtered list vs. an unfiltered one), confirm
            // which is the stable/complete source before relying on it.
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
          if (stagePath[newValue] > stagePath[oldValue]) {
            value = newValue;
          } else {
            value = oldValue;
          }
        } else if (field.objectPropertyName === "saAccountCode") {
          // BUG FIX: this must run here, on the raw value, BEFORE
          // formatFieldValue()/convertToBool() gets it below. youth_account's
          // type is "bool", so convertToBool() would otherwise lowercase
          // whatever this returns (e.g. "MINOR" -> "minor") and, since "minor"
          // doesn't match any of convertToBool()'s truthy strings ("true"/"1"/
          // "yes"/"y"), it would always resolve to "false" — silently losing
          // every minor-account signal. Handling the MINOR check here, on the
          // untouched raw value, and outputting "true"/"false" directly (not
          // "Yes"/"No") keeps this consistent with every other boolean field —
          // see the property-type note on the other bool fields: HubSpot's
          // single checkbox property's internal option values are lowercase
          // "true"/"false", so that's what needs to reach the event, not a
          // display-style "Yes"/"No" string.
          value =
            object[field.objectPropertyName] === "MINOR" ? "true" : "false";
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

    return this.formatFieldValue(value, field.type, field.options);
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
        // Passthrough: trim only, no title-casing. Used for fields the source
        // system already returns correctly formatted/cased (e.g. Loan Purpose)
        // where titleCase() would incorrectly reformat acronyms or intentional
        // casing (e.g. "HELOC" -> "Heloc"). See application_purpose field
        // comment above for full context.
        value = value.toString().trim();
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
    var newValue = null;

    if (value && typeof value === "string") {
      newValue = parseFloat(value.replace(/^\$\s*/, "").replace(/,/g, ""));
    }

    return isNaN(newValue) ? null : newValue;
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
    // TODO: Update application submitted logic to determine if the application
    // has been submitted, based on this client's actual completed/decision page.
    const currentURL = this.executeFunction("currentURL");

    return currentURL.includes("application-completed");
  }

  // Creates a pseudo ID for the application
  // This is used to track the application progress in HubSpot
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
    // FIX (from Leaders lessons learned): do NOT call resetPersistentId() here —
    // doing so wipes the session cookie, causing any subsequent page load/
    // navigation to generate a new session ID and a duplicate deal. Use a
    // dedicated submitted-flag cookie instead, leaving the session cookie intact.
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
    // TODO: Update the selector to match the next button in the POS.
    const nextButton = document.querySelectorAll(".div-continue-button");
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
    // NOTE: intentionally unconditional — this is NOT gated by
    // this.contactIdentified. Every field-change event fires and includes
    // contact_identified (true/false/null) as a payload property. Gating on
    // contact_identified belongs on the HubSpot deal upsert workflow's
    // enrollment criteria, not here.
    const properties = this.getCustomEventProperties();
    const serialized = JSON.stringify(properties);

    // Dedup guard: skip sending if this exact payload was just sent. Prevents
    // duplicate workflow enrollments when the same event fires multiple times
    // in quick succession (e.g. page postbacks/reloads without a genuine field
    // change).
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
  // TODO: Update DOM selector to obtain application type.
  let loanType =
    document.getElementById("hdnLoanType") ||
    document.getElementById("hdLoanType");
  if (!loanType) return null;

  // TODO: Update mapAppType keys to match internal application type names.
  // NOTE: if this client does not offer business/commercial applications
  // online, the commercial_* entries below will simply never resolve to a
  // match (no live loanType value routes to them) — that's fine, leave them
  // in place rather than stripping them out (same reasoning as
  // business_application field above), so nothing else needs to change if
  // that client later brings business applications online.
  let mapAppType = {
    1: "consumer_deposit",
    2: "consumer_loan",
    3: "consumer_vehicle",
    4: "consumer_credit_card",
    5: "consumer_equity",
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

    return new Application(appType);
  } else {
    return null;
  }
}

export const gha_application = initApplication();
