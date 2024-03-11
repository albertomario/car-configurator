import React, { useState, useEffect, useMemo } from 'react';
import OptionsSection from './OptionSection';

const Configurator = () => {
  const [configData, setConfigData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch data on initial load
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./carConfig.json');
      const data = await response.json();
      setConfigData(data);
      setTotalPrice(data.basePrice); 
    };
    fetchData();
  }, []);

  function extractPrices(obj, result = []) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        if ('price' in value) {
          result.push({[key]: value.price});
        }
        extractPrices(value, result);
      }
    }

    return Object.assign({}, ...result);
  }

  // Price calculation (useMemo for optimization)
  const calculatedTotalPrice = useMemo(() => {
    if (!configData) return configData?.basePrice || 0;

    return Object.values(selectedOptions).reduce((acc, code) => {
      const option = extractPrices(configData.options);
      return acc + (option[code] || 0);
    }, configData.basePrice); 
  }, [selectedOptions, configData]);

  const handleOptionChange = (optionCode, optionValue) => {
    setSelectedOptions({ ...selectedOptions, [optionCode]: optionValue });
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
      {configData && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {Object.keys(configData.options).map((category) => (
            <OptionsSection
              key={category}
              category={category}
              options={configData.options[category]}
              selectedOptions={selectedOptions}
              handleOptionChange={handleOptionChange}
            />
          ))}
          
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h2>Total Price: ${calculatedTotalPrice}</h2>
        {(selectedOptions && Object.keys(selectedOptions).length > 0) && (
            <>
                <h5>Selected Options:</h5>
                <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{JSON.stringify(selectedOptions, undefined, 2)}</pre>
            </>
        )}
      </div>
      </div>

    </div>
  );
};

export default Configurator;