# React Toggle Switch

## Overview

This repository contains a React + TypeScript implementation of a dynamic quiz component. The component allows users to interact with a series of questions and answers, providing visual feedback on the correctness of their choices. It is designed to be reusable, extendable, and easy to integrate into larger applications.

## Assumptions

1. **Background States**: The number of background states reflecting the correctness of answers equals the number of grouped answers. Each question will have an associated state indicating whether the user's answer was correct or incorrect.

2. **Randomisation**: The order of the answers is randomized on each render to ensure a varied user experience.

3. **State Persistence**: To facilitate easy navigation between active questions, the state of each question is saved. Switching between questions will not result in the loss of the user's progress or selections for each question.

## Limitations

1. **Maximum Answers**: The component is designed to handle a maximum of 3 words per answer toggle. If the answer requires more than three options, the component will not support it.

2. **Background States Count**: The component uses a fixed number of four background states to reflect the correctness of answers, regardless of the number of questions. This limitation simplifies the component's design but restricts its flexibility.

3. **Order Randomisation**: The order of answer positions is randomized on each render. This might impact scenarios where a specific order or consistency is required for user experience or analytics.