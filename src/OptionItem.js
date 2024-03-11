import React from 'react';
import { useState, useEffect } from 'react';

const OptionItem = ({ option, isSelected, selectedOptions, handleOptionChange }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to check if the option is currently valid
  const checkConstraints = () => {
    let isValid = true;
    setErrorMessage(null); 

    // Check 'requires'
    if (option.requires) {
      // check if all requirements are included in values of selectedOptions
      const allRequirementsMet = option.requires.every(requirementCode => Object.values(selectedOptions).includes(requirementCode));
      

      // check if selectedOptions
      if (!allRequirementsMet) {
        isValid = false;
        setErrorMessage('Requires: ' + option.requires); // List the missing requirements
      }
    }

    // Check 'conflicts'
    if (option.conflicts) {
      const hasConflict = option.conflicts.some(requirementCode => Object.values(selectedOptions).includes(requirementCode));       
      if (hasConflict) {
        isValid = false;
        setErrorMessage('Conflicts with: ' + option.conflicts); // List conflicts
      }
    }

    setIsDisabled(!isValid);
    return isValid;
  };

  // Check constraints initially and whenever relevant selections change
  useEffect(() => {
    checkConstraints();
  }, [selectedOptions, option]); 

  const handleSelect = () => {
    if (checkConstraints()) {
      // get option code by key
      handleOptionChange(option.type, option.code); 
    } 
  };

  return (
<div>
      {/* ... Option rendering based on type */}
      <button onClick={handleSelect} disabled={isDisabled}>
        {option.name} {isSelected ? '(Selected)' : ''}
      </button>
      {errorMessage && <p className="error-message" style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}
    </div>
  );
};

export default OptionItem;