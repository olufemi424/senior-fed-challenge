# Candidate: Olufemi Afolabi
Source of the exercise: [Repository](https://github.com/olufemi424/senior-fed-challenge)

## Features

Good:
- The list/grid view works correctly
- The favorites view works correctly
- The filters work correctly
- The loading and error states are handled correctly

Bad:
- The search makes an api call on every keystroke. Usually, this kind of components are debounced
to avoid making too many request to the api.
- The filters are not preserved when going to the details view and navigating back. You can save the
filters as query params and the back button will just work.

## Look and feel, usability and responsive

Good:
- The application looks good

Bad:
- Some pokemon images don't preserve the aspect ratio. You can use object-fit: contain; to improve
the visualization
- The responsive design has some problems. E.g. on mobile, the list view cards does not takes the
whole width and the pagination forces horizontal scroll.

## Code quality
Good:
- The code is easy to follow and well organized
- Level of componentization

Bad:
- There are no unit or integration tests
- There is a documented edge case when removing favorite pokemons related to the pagination
- The api url is copy and paste in several places, it should be extracted to a common place

## No offer
### Message from Senior Engineer manager of IBM Quantum Services

Unfortunately, we are not continuing with your application. Your implementation looks nice and clean, and the level of structure and componentization is good. However, your submission has not the level of technical quality we would expect from a senior developer. You can find a detailed review attached to this e-mail.

All the best and thank you for your interest in IBM Quantum. I encourage you to review our offerings for future opportunities.

## My Comments

It was a fair challenge, and i did what i thought is enough to show that i have the skills, the above feedback are easy fix, and i appreciate them