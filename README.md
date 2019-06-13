# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Things this Tweeter can do:
- Read past tweets on load page
    - latest tweet appears on the top
    - each tweet shows the person's avatar, user/name, user's handler, interaction icons and timestamp on when the tweet was sent
        - the time stamp includes seconds, minutes, or days elapsed
- Compose button :
    - toggles new compose box upon click
    - auto-focuses on the textfield
    - shows a character-counter below the textfield
    - displays an error message if an empty tweet is submitted
    - displays an error message if the text is greater than 140 characters
        - error messages slides up and down
    - sends a tweet that displays on the main page
- Display:
    - Navigation bar is fixed position with logo, title, and compose [tweet] button
    - *other style, color scheme, etc, editing can be changed*



!["Screenshot of URLs page"]()
!["Screenshot of URLs page"]()
!["Screenshot of URLs page"]()
!["Screenshot of URLs page"]()


## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
