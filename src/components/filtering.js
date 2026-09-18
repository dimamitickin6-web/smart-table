import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        const filterOption = document.createElement('option');
                        filterOption.value = name;
                        filterOption.textContent = name;
                        return filterOption;

                    })
            );
        });

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            const clearInputParent = action.parentElement;
            const clearInput = clearInputParent.querySelector('input');

            if (clearInput) {
                clearInput.value = '';
            }
            const fieldName = action.dataset.field;
            if (fieldName && state[fieldName]) {
                state[fieldName] = '';
            }
            
        }

        return data.filter(row => compare(row, state));
    }
}