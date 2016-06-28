## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * RootSearchPage (Root page)
    * Header
      * Search
      * Logo
      * Signup/Login Link
    * Search Results
      * Filter
      * Business Index
    * BusinessesMap
    * Login Modal
      * NewSessionForm
      * LoggedOutContent
      * NewUserForm
  * **BusinessProfile**
    * BusinessDetail
      * Map
      * Hours
      * Misc Info
    * ReviewIndex
    * New Review Modal

## Routes

* **component:** `App` **path:** `/`
  * **component:** `RootSearchPage` **path:** index
    * **component:** `BusinessDetail` **path:** `businesses/:businessId`

