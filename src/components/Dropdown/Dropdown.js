import React, {useState, useEffect, useRef} from 'react';

const Dropdown = ({options, selected, onSelectedChange}) => {

  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  const ref = useRef();
  
  useEffect(() => {
    const onBodyClick = (event) => {
      if(ref != null && ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
  
    document.body.addEventListener('click', onBodyClick);

    // cleanup function for if element removed from DOM
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    
    if (option.value === selected.value) {
      return null;
    }
    
    return (
      <div key={option.value} 
        className="item"
        onClick={()=> onSelectedChange(option)}
        >
        {option.label}
      </div>
    );
  });

  return (
    <>
      <button onClick={() => {setShowDropdown(!showDropdown)}}>Toggle dropdown</button>
      <div ref={ref} className="ui form">
        <div className="field">
          <label className="Label">Velg en farge</label>
          <div onClick={() => setOpen(!open)} 
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
            <i className="dropdown icon"></i>
            <div className="text">{selected.label}</div>
            <div className={`menu ${open ? 'visible transition' : ''}`}>
              {renderedOptions}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;