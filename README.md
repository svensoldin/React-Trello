# React-Trello

The project was inspired by a challenge to build a Trello clone (Trello Clone Challenge: https://devchallenges.io/challenges/wP0LbGgEeKhpFHUpPpDh). I thought it would be interesting to try and reproduce the very intuitive UI of a major app such as Trello, and that I would definitely learn a lot along the way. Hence why I chose to use Typescript as well, to see what all the buzz is about (I can now say that I am definitely a fan) and challenge myself.

The heart of the app lays in the drag and drop features. After trying to use HTML's drag and drop API (https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) to no avail, I brought in the major drag and drop library for React projects, [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd), which works beautifully.

State is managed mostly locally across the app. However, the authentication information is managed with `useReducer` and context. And the board state is managed with [jotai](https://github.com/pmndrs/jotai) atomically, which was also exciting to learn.

The end result is a bit barebones but the focus was more on functionality than decorum.

See the API repo [here](https://github.com/svensoldin/Thullo-Server)
