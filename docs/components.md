## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * Frontpage (Root page)
    * Search
    * Search Results
    * BusinessesMap
  * **LoginPage**
    * NewSessionForm
    * LoggedOutContent
    * NewUserForm
  * **BusinessIndex**
    * ReviewIndexItem
    * **BusinessIndexItem**
      * ReviewIndex
        * **ReviewIndexItem**
      * ReviewForm
      * BusinessMap

## Routes

* **component:** `App` **path:** `/`
  * **component:** `Frontpage` **path:** index
    * **component:** `BusinessIndex` **path:** `businesses/:businessId`
  * **component:** `LoginPage` **path:** `session/`
        * **component:** `ReviewIndex` **path:** `business/:businessId/reviews/`
          * **component:** `ReviewIndexItem` **path:** `business/:businessId/reviews/:reviewId`

For Routes that have no `businessId`, `BusinessesIndex` will render all
businesses.

For Routes that have no `reviewId`, `ReviewsIndex` will render all
businesses.
