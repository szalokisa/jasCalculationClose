import './Filters.scss';
import FilterField from './FilterField';
import pictureClearAll from './clearAll.svg';

export default function Filters(props) {
  const selectedFilters = props?.reportParams?.selectedFilters;
  if (!selectedFilters) {
    return <></>;
  }

  const filters = selectedFilters.map((fieldName) => {
    const column = props.reportParams.columns.find(
      (col) => col.field === fieldName,
    );
    const filterField = {
      fieldName,
      filterType: column.type,
      options: column.options,
    };
    return filterField;
  });

  function clearAll() {
    Array.from(document.querySelectorAll('.reportFilter'))
      .filter((e) => e.value)
      .forEach(field => {
        field.value = '';
      })
  }

  return (
    <div className='filters'>
      <div className='filters-buttonArea' role='group'>
        <button type="button" className="btn btn-success" onClick={clearAll}>
          <img src={pictureClearAll} alt="Clear all filterfield" width="48px" height="48px" />
        </button>
      </div>
      <div className='filters-filterfields'>

      {filters.map((filterField) => (
				  
        <FilterField
          key={`filter-${filterField.fieldName}`}
          fieldName={filterField.fieldName}
          filterType={filterField.filterType}
          options={filterField.options}
          language={props.language}
          languageElements={props.languageElements}
        />
      ))}
		   
      </div>
    </div>
  );
}
