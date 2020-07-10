# POC React with xstate

This POC has multiple objective:

* try xstate
* notes all the pain points
* see if it can fit in every day jobs and in which context

## First feelings after a look at the documentation

Seems quite complete but a one man project. https://github.com/davidkpiano/xstate/graphs/contributors

The documentation seems quite complete.

The learning curve seems not has easy as with redux or other state managment.

## XState goals

You can forget the easy
but the gain is great debugging tools and strong enforcing the workflow of state&transitions inside a component

## First excercise: Fetch

I try here to build a fetch machine with cancel option to see how it can help us to build component that need multiple requests.

# Notes and paint points

* devTools option :facepalm: all current devtool is way much easy no change on the code. The lib check the existence of a global variable which is the extension and activate devtool in that case.

* Then once you know you have to pass an option how can I ? The doc do not tells you, looking at the code ... => useMachine(fetchMachine, {devTools: true}); :(


