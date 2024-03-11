import React from 'react';
import OptionItem from './OptionItem';

let keyCounter = 0; // To generate unique keys

const OptionsSection = ({ category, options, selectedOptions, handleOptionChange }) => {
  const sectionStyle = {
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    margin: '2rem',
  };
  return (
    <div style={sectionStyle}>
      <h2>{category}</h2>
      {Object.keys(options).map((optionType) => (
        <div key={optionType}>
          <h3>{optionType}</h3> 
          {traverseAndRender(options[optionType], optionType, selectedOptions, handleOptionChange)} 
        </div>
      ))}
    </div>
  );
};

function traverseAndRender(optionData, optionType, selectedOptions, handleOptionChange, code = null) {
  if (optionData.name) { 
    const isSelected = selectedOptions[optionType] === code;
    return (
      <OptionItem
        option={{ ...optionData, code, type: optionType }}
        key={`optionItem-${keyCounter++}`} // Unique key 
        isSelected={isSelected}
        handleOptionChange={handleOptionChange}
        selectedOptions={selectedOptions}
      />
    );
  } else {
    // Not using recursion here, directly render elements based on options
    return Object.keys(optionData).map((key) => (
      <div key={`optionItem-${keyCounter++}`}> 
        {traverseAndRender(optionData[key], optionType, selectedOptions, handleOptionChange, key)}
      </div>
    ));
  }
}

export default OptionsSection;