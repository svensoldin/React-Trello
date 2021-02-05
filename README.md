# React-Trello

The project was inspired by a [challenge](https://devchallenges.io/challenges/wP0LbGgEeKhpFHUpPpDh) to build a Trello clone. I thought it would be interesting to try and reproduce the very intuitive UI of a major app such as Trello, and that I would definitely learn a lot along the way. Hence why I chose to use Typescript as well, to see why it was so popular (I have definitely adopted it now) and challenge myself.

The heart of the app lays in the drag and drop features. After trying to use [HTML's drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) to no avail, I brought in the major drag and drop library for React projects, [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd), which works great.

State is managed mostly locally across the app. However, the authentication information is managed with `useReducer` and context. And the board state is managed with [jotai](https://github.com/pmndrs/jotai) atomically, which I also learned with this project.

The end result is a bit barebones but the focus was more on functionality than decorum.

See the API repo [here](https://github.com/svensoldin/Thullo-Server)

### Credits

- [Application State Management with React (Kent C. Dodds)](https://kentcdodds.com/blog/application-state-management-with-react)

- [Mastering Session Authentication (Christian Cashiola)](https://itnext.io/mastering-session-authentication-aa29096f6e22)
