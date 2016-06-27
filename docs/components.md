## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * Frontpage (Root page)
    * Search
    * Search Results
    * Map
  * Search Results
    * ReviewIndex
  * LoginPage
    * NewSessionForm
    * LoggedOutContent
    * NewUserForm
    * **BusinessIndex**
      * ReviewIndexItem
      * Business Details
      * **BusinessIndexItem**
        * ReviewIndexItem
        * ReviewForm
        * Map
      * **ReviewsIndex**
        * Search
        * ReviewIndexItem
        * Map
        * **ReivewIndexItem**
          * BusinessInfo
          * ReviewEditArea

## Routes

* **component:** `App` **path:** `/`
  * **component:** `Frontpage` **path:** index
  * **component:** `BusinessIndex` **path:** `businesses/`
    * **component:** `BusinessDetail` **path:** `businesses/:businessId`
      * **component:** `ReviewIndex` **path:** `business/:businessId/reviews/`
        * **component:** `ReviewIndexItem` **path:** `business/:businessId/reviews/:reviewId`

For Routes that have no `businessId`, `BusinessesIndex` will render all
businesses.

For Routes that have no `reviewId`, `ReviewsIndex` will render all
businesses.
