## code-splitting lazy load
*https://medium.com/@abhayshiravanthe/modules-and-code-splitting-in-webpack-5-6ce0a58d7f36

## responsive routing
*https://www.digitalocean.com/community/tutorials/react-crud-context-hooks

*https://reactarmory.com/guides/context-free-react-router

Proof of concept is in `07ablank-resp-data-pag-grid` where `App`  sets the page and `Ctrl.changePage` runs `App.handle.Page=>setPage` which does the `history.push`. The other func in `App` that runs `setPage` is `window.onhashchange`

Should the whole thing be in context? Does any page besides `App` well beloow `Ctrl` need access the page change machinery?

Should touching somewhere on a page make it active in a multi-pane situation. Frome one page do you need to go to another, not by the nav menu?


## grid css
*https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/

*https://medium.com/samsung-internet-dev/common-responsive-layouts-with-css-grid-and-some-without-245a862f48df

*https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout

*https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout


## bootstrapping authorization
If you have an token, or can copy one in, use it. This app is bootstrapped to a timecards/RRCLLC/tim token.

## howto build an app

### check your credentials
Get some quick meta data  from the server at the startup of the app. render the opening page or direct user to sign in. Meanwhile wait for the table data displaying some blank. Same process for any route. Each route should make a call to back to control for auth.
### sharing data by props betweeen pages
Display an array of pages where only the one selected owns the route. Displaying multiple pages means that all are rendered and will re-render when the props change. a change in one page proagates back up to control where it gets rerendered to the other pages and sent to the server. The server comes back with data that modifies the pages props causing rerenders.
### fetches in services or right out of control? 
### how do route pages send data back to control?
throught a function you sent with a link 

## log
https://www.atlassian.com/git/tutorials/using-branches/git-checkout#:~:text=The%20git%20checkout%20command%20lets,new%20commits%20on%20that%20branch.

`git tag` lists all your tags

In order to go back and run at a previous tag `git checkout 4-abplank_hashroute_responsive-data`. You want to be all commited up before. oNCE YOU MOVE, You don't want to make any changes here since your head is detached. 

To continue developing, you need to get back to the “current” state of your project: 

if git status says 

    HEAD detached from 4-abplank_hashroute_responsive-data

then reattach with
 
    git checkout main

but now if you have doene anything like a commit while you were back at 4, going to main says `Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded. (use "git pull" to update your local branch)`

    git pull

If you want to create a new branch from a prior tag to retain commits you create, you may do so (now or later) by using -b with the checkout command again. Example:

    git checkout 3-ablank_context
    git checkout -b <new-branch-name>
    git branch //lists branches available

### 2/3/21 3-ablank_context
### 2/4/21 4-abplank_hashroute_responsive-data
In this iteration I dumped react-router opting using a `Ctrl` component that listens for `window.onhashchange` then sets the page based on that. That gets you <> navigation via your browser buttons. The other way to set a page is programatically from a nav bar or something.
### 2/5/21 5-ablank_hash_resp.data_grid
Navbar is on its own, Jobs, AddJob and Help are in the grid container
### 2/5/21 6-git-test
see git notes above
### 2/5/21 07ablank-acontext-onresize-onhashchange
moving functionality from App to context
### 2/5/21 08ablank-code-splitting
works in dev but not prod, but prod build is so tiny, 
