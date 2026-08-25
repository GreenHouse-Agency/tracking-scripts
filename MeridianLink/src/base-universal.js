// =============================================================================
// UNIVERSAL ONLINE APPLICATION TRACKING — PLATFORM-AGNOSTIC BASELINE
// =============================================================================
// This file has two kinds of content, and it matters which is which:
//
//   [CORE PATTERN]     — proven architecture, not tied to any specific POS
//                         platform. Keep this as-is regardless of what
//                         platform you're building for.
//
//   [LOANSPQ EXAMPLE]  — shown here as a worked example of how the CORE
//                         PATTERN gets filled in for one real platform
//                         (MeridianLink LoansPQ). If the client you're
//                         building for uses LoansPQ, don't rebuild this from
//                         scratch — start from base-loanspq.js instead,
//                         which is this same architecture with the LoansPQ
//                         pieces already filled in as confirmed defaults.
//                         Use THIS file only when the client is on a
//                         DIFFERENT platform: read each [LOANSPQ EXAMPLE]
//                         block to understand what that piece of the puzzle
//                         needs to do, then replace it with that platform's
//                         equivalent.
//
// TODO markers below are for the genuinely new-platform work: finding that
// platform's version of each [LOANSPQ EXAMPLE] block. There are far fewer of
// them than you might expect, because most of the file is CORE PATTERN.
// =============================================================================

export default class Application {
  constructor(type) {
    // TODO: replace every field below with this platform's actual field
    // locations. The shape of each field entry (type/locator/function/
    // objectLocation/objectPropertyName/selector) is CORE PATTERN — keep
    // it. The values inside each one need to match this platform's actual
    // fields.
    //
    // locator meanings (CORE PATTERN):
    //   "query"    — read from the DOM via document.querySelector(). This
    //                is the DEFAULT you should expect to need for nearly
    //                every field on a new platform. Across roughly ten
    //                non-LoansPQ platforms built against so far, none have
    //                exposed an in-app helper function comparable to
    //                LoansPQ's getCurrentAppInfo() — DOM selectors have
    //                been the only available mechanism every time. Can be a
    //                comma-separated list tried in priority order (see
    //                getQuerySelectorValue() below) — useful when a
    //                platform renders a legacy/duplicate field alongside
    //                the real one (confirmed happening on LoansPQ itself).
    //   "default"  — set programmatically elsewhere in the code (constants,
    //                derived values, flags), not read from the page.
    //   "function" — read via a page-global data function. [LOANSPQ
    //                EXAMPLE ONLY] — LoansPQ happens to expose
    //                getCurrentAppInfo() for this; don't expect an
    //                equivalent on a new platform unless you've confirmed
    //                one exists (check for a global object/function in the
    //                page's own JS before assuming "query" won't work).
    //                Shown here anyway because a few of LoansPQ's
    //                function-based fields illustrate special-case
    //                transformation logic (parsing a JSON array, tracking a
    //                "furthest reached" value, converting a non-standard
    //                raw value) that's worth learning from regardless of
    //                whether this platform has a function to call — the
    //                same logic can run against a DOM-read value just as
    //                well.
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
      // [LOANSPQ EXAMPLE] application_id read via a DOM element LoansPQ
      // populates once MeridianLink has assigned an application number.
      // Find this platform's equivalent — usually a hidden field or a
      // value embedded in the page/URL once an application is created.
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
      // TODO: fill in real selectors below. locator "query" is the expected
      // default per the note above — these are DOM-read placeholders, not
      // examples of a data function you should expect to find. If you DO
      // confirm this platform exposes something like getCurrentAppInfo(),
      // switch the relevant field(s) to locator: "function" instead (see
      // deposit_products/furthest_step_viewed/youth_account/amount further
      // below for what that looks like).
      first_name: {
        type: "string",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      last_name: {
        type: "string",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      // [CORE PATTERN] "email"/"lowercase_string" type — trims and
      // lowercases only, deliberately skipping titleCase(). An email has no
      // spaces, so titleCase() would only capitalize the first character
      // (e.g. "john@gmail.com" -> "John@gmail.com"). Keep this type for any
      // email field regardless of platform.
      email: {
        type: "email",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      cell_phone: {
        type: "phone",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      home_phone: {
        type: "phone",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      work_phone: {
        type: "phone",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      preferred_contact_method: {
        type: "dropdown",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      // [LOANSPQ EXAMPLE] the key === "amount" special case in
      // getFieldValue() below shows a pattern worth reusing regardless of
      // platform: try several known data-source properties in priority
      // order (since only one exists depending on which product/application
      // type is active), with a DOM selector list as a last-resort
      // fallback. The specific property names (LoanAmount,
      // ProposedLoanAmount, etc.) and the deposit-sum logic are LoansPQ's
      // actual data shape — replace with this platform's equivalent, but
      // the "try several sources, cheapest/most-reliable first" structure
      // is worth keeping.
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
      // TODO: only relevant if this platform has an explicit "save and
      // finish later" action distinct from just closing the tab — if so, it
      // needs its own event listener setting this value (see
      // createNextButtonEventListener() below for the pattern). Otherwise
      // remove this field or leave it permanently empty.
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
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      // [LOANSPQ EXAMPLE] the saAccountCode special case in getFieldValue()
      // below is worth reading even for a different platform: it shows WHY
      // a raw-value transformation (mapping "MINOR" -> "true"/"false") must
      // happen before formatFieldValue()'s type conversion runs, not after
      // — a "bool" type field run through convertToBool() would otherwise
      // silently mangle a non-standard raw value into "false". If this
      // platform has an equivalent minor/youth-account flag with a
      // non-boolean raw value, use the same pattern.
      youth_account: {
        type: "bool",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "saAccountCode",
        selector: null,
        value: null,
      },
      // If this client/platform doesn't offer business/commercial
      // applications online, this stays null — kept in the data model for
      // consistency rather than removed, so nothing else needs to change if
      // that's added later.
      business_application: {
        type: "bool",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      // [LOANSPQ EXAMPLE] #hdIsLineOfCredit is a LoansPQ-specific DOM id.
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
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      // [CORE PATTERN + LOANSPQ EXAMPLE] the design decision here is
      // platform-agnostic and worth keeping regardless: send this as a
      // free-text string Deal property (not a HubSpot enumeration) to avoid
      // the enum-maintenance overhead of a client's product list changing
      // over time. "enum" as the type here only controls the internal
      // array-to-delimited-string join (convertToEnum) — it does not mean
      // this maps to an actual HubSpot enumeration property. The specific
      // extraction/label-lookup logic in getFieldValue() below (parsing
      // SelectedProducts, resolving a name via window.PRODUCTLIST) is
      // LoansPQ's actual data shape — replace with this platform's
      // equivalent product-selection data.
      deposit_products: {
        type: "enum",
        locator: "function",
        function: "getCurrentAppInfo",
        objectLocation: "root",
        objectPropertyName: "SelectedProducts",
        selector: null,
        value: null,
      },
      // [CORE PATTERN] "raw_string" type — trims only, deliberately skips
      // titleCase(). Use this whenever the source already renders a value
      // correctly formatted/cased (confirm by inspecting the actual DOM
      // text before assuming) — titleCase() would otherwise mangle
      // acronyms (e.g. MeridianLink's "Adjustable Rate HELOC" -> "Adjustable
      // Rate Heloc"). If this platform's equivalent field needs cleanup
      // instead, use "string" so titleCase() still applies.
      application_purpose: {
        type: "raw_string",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      credit_card_name: {
        type: "string",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      vehicle_type: {
        type: "string",
        locator: "query",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: null,
      },
      // [LOANSPQ EXAMPLE] the "stage" special case in getFieldValue() below
      // demonstrates a CORE PATTERN worth keeping: track the FURTHEST step
      // reached (never regress), and force the final "completed" value
      // whenever appSubmitted() is true regardless of what the platform's
      // own stage/status value says — a platform's own status text can get
      // stuck or lag on the exact page a completion happens, and the
      // submission-detection logic (appSubmitted()) is usually more
      // reliable than a status label. The actual stage names
      // ("Product Information", etc.) are LoansPQ's — replace with this
      // platform's step names.
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
      // [CORE PATTERN] always present in the event payload once flipped
      // true (default "false", never left null/absent) — never used to
      // gate whether an event sends (see updateFieldValues() below). No
      // Deal property equivalent needed; used purely as enrollment criteria
      // on a HubSpot workflow, to avoid creating unactionable records
      // before a contact is identified. Keep this pattern regardless of
      // platform.
      contact_identified: {
        type: "bool",
        locator: "default",
        function: null,
        objectLocation: null,
        objectPropertyName: null,
        selector: null,
        value: "false",
      },
      // [CORE PATTERN] same always-present pattern as contact_identified.
      // Deliberately a separate, simpler signal from application_id —
      // gives a downstream workflow a stable flag to key a deal-stage
      // update off of, independent of whatever shape an ID field takes on
      // a given platform.
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
    this.contactIdentified = false;
    this.isSubmitted = false;
    // [CORE PATTERN] idempotency guard for closeApplication() — see that
    // method's comment.
    this.applicationClosed = false;
    // [CORE PATTERN] plain in-memory dedup guard — see sendCustomEvent().
    // Safe as long as the singleton guard in initApplication() holds (only
    // one Application instance ever exists per page load).
    this.lastSentPayload = null;

    this.setPersistentId();
    this.queryParameterPrefill();

    // [CORE PATTERN] restores contact_identified from a cookie on
    // construction — needed because this Application instance can get
    // recreated on a later page load within the same session, and
    // in-memory state alone resets to false each time.
    if (this.getContactIdentifiedCookie()) {
      this.contactIdentified = true;
      this.fields.contact_identified.value = "true";
    }

    // [CORE PATTERN] periodic fallback in case a page transition happens
    // without a tracked click (e.g. browser back/forward, or a route change
    // that doesn't go through a listened-for button).
    this.intervalID = setInterval(this.updateFieldValues.bind(this), 60000);
    this.createNextButtonEventListener();

    // [LOANSPQ EXAMPLE] this MutationObserver pattern — wait for a specific
    // element to exist AND have a non-empty value before treating it as
    // "known," rather than element-existence alone — is CORE PATTERN and
    // worth keeping for any platform where a key field (like an application
    // number) gets populated asynchronously after initial page load. The
    // specific element id (#hdloanDtl) is LoansPQ's.
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
  // [CORE PATTERN] this entire section — cookie-based session ID, cookie-
  // based contact_identified and submitted-flag persistence — is
  // platform-agnostic. Adapt cookie names/scoping as needed, but the
  // underlying reasoning (in-memory JS state doesn't survive page reloads;
  // anything that must survive across those boundaries needs cookie
  // persistence) applies regardless of platform.
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

  // Do NOT call this from closeApplication() — clearing the session cookie
  // on submission causes any subsequent page load/navigation to generate a
  // new session ID and a duplicate deal record. Kept for reference/rollback
  // only.
  resetPersistentId() {
    document.cookie =
      this.cookieName + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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

  // Persists contact_identified via cookie so this state survives the
  // Application instance being recreated on subsequent page loads within
  // the same session — in-memory state alone is not reliable, since it
  // resets to false every time a new instance is constructed. Without this,
  // a later event — including the final submission event — could go out
  // missing contact_identified even though the contact was already
  // identified earlier in the session, causing a HubSpot deal upsert
  // workflow to fail enrollment.
  getContactIdentifiedCookie() {
    const match = document.cookie.match(
      new RegExp("(^| )" + this.contactIdentifiedCookieName + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) === "true" : false;
  }

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
  /*********************************/
  /*** End Persistent ID Methods ***/
  /*********************************/

  /*********************************************/
  /*** Start Query Parameter Prefill Methods ***/
  /*********************************************/
  // [CORE PATTERN]
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
  // [CORE PATTERN] this entire method's structure is platform-agnostic:
  // loop every field for changes, identify the contact once
  // email/first/last are all known, then resync contact_identified/
  // submitted UNCONDITIONALLY every pass — decoupled from whether any other
  // field happened to change this same pass, so a genuine transition in
  // either value is itself always a reason to send an event. This
  // decoupling matters: nesting the submission check inside "did something
  // else also change" risks silently missing or delaying the moment
  // submission is detected.
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
        // is only used as enrollment criteria on a HubSpot workflow, not as a
        // client-side gate on what events get sent.
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

    const contactIdentifiedValue = this.contactIdentified ? "true" : "false";
    if (this.fields.contact_identified.value !== contactIdentifiedValue) {
      this.fields.contact_identified.value = contactIdentifiedValue;
      fieldsUpdated = true;
    }

    // TODO: application_id is required here as an extra safety condition,
    // in addition to appSubmitted() — confirm whether this platform's
    // submission-detection signal (appSubmitted() below) can ever fire
    // before a meaningful ID is known, the way LoansPQ's could in earlier,
    // less reliable versions of this logic. If appSubmitted() alone is
    // trustworthy on this platform, this extra condition can be dropped.
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
  // TODO: this method's special-case branches (SelectedProducts, stage,
  // saAccountCode, amount) are [LOANSPQ EXAMPLE]s of a [CORE PATTERN]: some
  // fields need transformation logic beyond a plain property/DOM read
  // (parsing a JSON array, tracking a "furthest reached" value, converting
  // a non-standard raw value before type conversion runs). Find this
  // platform's equivalent needs and add special cases the same way,
  // keeping the generic function/query dispatch below untouched.
  getFieldValue(field, key) {
    var value = null;
    var object = null;

    // [LOANSPQ EXAMPLE] see amount field comment above.
    if (key === "amount") {
      const appInfo =
        typeof getCurrentAppInfo === "function" ? getCurrentAppInfo() : null;

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
          return this.formatFieldValue(
            appInfo[prop],
            field.type,
            field.options
          );
        }
      }
      return this.formatFieldValue(
        this.getQuerySelectorValue(field.selector),
        field.type,
        field.options
      );
    }

    // [CORE PATTERN] generic dispatch by locator type — keep this structure
    // regardless of platform.
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
        // [LOANSPQ EXAMPLE] the three special cases below.
        if (
          field.objectPropertyName === "SelectedProducts" &&
          typeof object[field.objectPropertyName] === "string"
        ) {
          try {
            const selectedProducts = JSON.parse(
              object[field.objectPropertyName]
            );

            // --- CODE vs. LABEL — TOGGLE BLOCK ---
            // If using an enumerator property instead of free-text:
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

          if (this.appSubmitted()) {
            value = "Application Completed";
          } else if (stagePath[newValue] > stagePath[oldValue]) {
            value = newValue;
          } else {
            value = oldValue;
          }
        } else if (field.objectPropertyName === "saAccountCode") {
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

  // [CORE PATTERN] splits a comma-separated selector list and tries each
  // individually, in the order listed, taking the first one with an actual
  // non-empty value — not just the first one present in the DOM. A plain
  // document.querySelector(selectorList) call returns whichever match comes
  // first in DOM order, which silently breaks whenever a page has a
  // legacy/hidden duplicate field sharing a selector with the real one.
  // Worth this exact pattern on any platform with query-locator fields.
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

  // TODO: replace with this platform's actual data-access functions.
  executeFunction(func) {
    if (func === "getCurrentAppInfo") {
      return getCurrentAppInfo();
    } else if (func === "currentURL") {
      return currentURL().trackedURL;
    }
  }

  // [CORE PATTERN] this entire type-conversion system is platform-agnostic
  // — keep all of it, including the less obvious types (raw_string,
  // email/lowercase_string) even if this platform doesn't need them yet.
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
        value = value.toString().trim();
      } else if (type === "email" || type === "lowercase_string") {
        value = value.toString().trim().toLowerCase();
      } else if (type === "string") {
        value = this.titleCase(value.toString().trim());
      } else if (type === "phone") {
        value = "+1" + value.toString().replace(/\D/g, "");
      }
    }

    return value;
  }

  convertToNumber(value) {
    // Handles both string and raw number input — a plain
    // typeof value === "string" check alone silently returns null for a
    // raw JS number (e.g. one computed in code, like a summed total).
    if (value === null || value === undefined || value === "") return null;

    if (typeof value === "number") {
      return isNaN(value) ? null : value;
    }

    const parsed = parseFloat(
      value
        .toString()
        .replace(/^\$\s*/, "")
        .replace(/,/g, "")
    );
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

  // [CORE PATTERN] only identifies once email/first/last are all known.
  // Only identify contact and set contact_identified once email, first
  // name, and last name are all simultaneously known. This is used
  // downstream as a HubSpot deal upsert workflow's enrollment gate (to
  // avoid unactionable or nameless deal records) — it does NOT gate
  // whether this event, or any event, gets sent to HubSpot. See
  // sendCustomEvent() / updateFieldValues().
  identifyHubSpotContact() {
    var email = this.fields.email.value;
    var first_name = this.fields.first_name.value;
    var last_name = this.fields.last_name.value;

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

  // TODO: replace with this platform's actual submission-detection logic.
  // [CORE PATTERN worth keeping]: prefer detecting submission via the
  // EARLIEST reliable signal available (a URL change, a specific element
  // appearing, a submit button's click event itself) rather than waiting
  // for a final "thank you" page — a user could plausibly close the tab
  // between the true submission and that final page, which would mean a
  // genuinely-submitted application never gets flagged as submitted.
  appSubmitted() {
    const currentURL = this.executeFunction("currentURL");
    return currentURL.includes("application-completed");
  }

  // Creates a pseudo ID for the application
  // This is used as an alternate method to track the application progress in HubSpot
  // The pseudo ID combines application type, email, and submission date
  // Example: "consumer_loan-john.doe@gmail.com-20231001"
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
    // [CORE PATTERN] idempotency guard — submitted deliberately keeps
    // riding along as true on further browsing after submission, so this
    // method could otherwise get re-triggered on a later pass, redundantly
    // re-running cookie writes/interval clears.
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
  // TODO: replace the selector with this platform's actual "next"/"submit"
  // button. [CORE PATTERN worth keeping]: use direct addEventListener on
  // the matched element(s), not event delegation on a shared ancestor —
  // delegation relies on the click bubbling up, and if the platform's own
  // inline validation handler calls stopPropagation() before a delegated
  // listener sees the event, the handler never fires at all. Multiple
  // listeners on the same element are unaffected by stopPropagation(),
  // which only blocks further bubbling to ancestors.
  // Also confirm the button selector isn't reused by unrelated elements
  // (e.g. popup/modal dialog buttons) — if so, scope the selector to a
  // container that only wraps the real navigation button (e.g. a stable
  // footer/nav element), rather than reaching for delegation to solve it.
  createNextButtonEventListener() {
    const nextButton = document.querySelectorAll('[data-role="footer"] .div-continue-button');
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
  // [CORE PATTERN] intentionally unconditional — NOT gated by
  // contactIdentified. Every field-change event fires; contact_identified/
  // submitted are properties ON the event, used as workflow enrollment
  // criteria downstream, not as a client-side gate on what gets sent.
  sendCustomEvent() {
    const properties = this.getCustomEventProperties();
    const serialized = JSON.stringify(properties);

    // Plain in-memory dedup guard — safe as long as the singleton guard in
    // initApplication() holds (only one Application instance ever exists
    // per page load). If this platform's script could plausibly execute
    // more than once per page load and the singleton guard isn't reliable
    // there for some reason, this guard alone will not catch duplicates
    // across separate instances — investigate why multiple instances exist
    // rather than trying to patch around it here.
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

// TODO: replace the application-type detection below with this platform's
// actual mechanism. [CORE PATTERN worth keeping]: the singleton guard at
// the top, and skipping re-initialization if a submitted-flag cookie is
// already set.
export function initApplication() {
  // [CORE PATTERN] singleton guard: refuses to construct a second
  // Application instance if this script somehow executes more than once
  // for a single page load (e.g. a tag manager trigger firing more than
  // once for what should be a single page view). Must be a window-scoped
  // property, not a module-scoped variable — if the script runs twice,
  // each run gets its own independent module scope, so only something
  // explicitly attached to window is visible across both executions. A
  // real page navigation naturally clears this, since window itself gets
  // torn down.
  if (window.__onlineAppTrackingInstance) {
    return window.__onlineAppTrackingInstance;
  }

  // [LOANSPQ EXAMPLE] replace with this platform's actual application-type
  // detection (a DOM element, a URL pattern, a global variable, etc.) and
  // its actual set of application types.
  let loanType = document.getElementById("hdnLoanType") || document.getElementById("hdLoanType");
  if (!loanType) return null;

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
    // [CORE PATTERN] skip initialization entirely if already submitted —
    // prevents generating a new session ID and a duplicate deal on a
    // subsequent page load after submission.
    const submittedFlagCookieName = "app_submitted_" + appType;
    const submittedMatch = document.cookie.match(
      new RegExp("(^| )" + submittedFlagCookieName + "=([^;]+)")
    );
    if (submittedMatch && decodeURIComponent(submittedMatch[2]) === "true") {
      console.log(
        "[Online Application Tracking] Application already submitted, skipping initialization."
      );
      return null;
    }

    return (window.__onlineAppTrackingInstance = new Application(appType));
  } else {
    return null;
  }
}

export const gha_application = initApplication();