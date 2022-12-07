function Form(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit(event.currentTarget.name.value,
                       event.currentTarget.temp.checked,
                       event.currentTarget.rain.checked)
  };
  
  return (
    <form onSubmit={handleSubmit}>
        <label>
          City name:
          <input id='name' type="text"/><br />
        </label>
        <label>
          <input id='temp' type="checkbox"/>Temperature<br />
        </label>
        <label>
          <input id='rain' type="checkbox"/>Rain<br />
        </label>
        <input type="submit" value="Show!"/>
      </form>
  )
}

export { Form }