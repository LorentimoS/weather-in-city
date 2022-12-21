function Form(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit(event.currentTarget.name.value,
                       event.currentTarget.temp.checked,
                       event.currentTarget.rain.checked)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id='name' type="text" placeholder="Enter a city" /><br />
      <input id='temp' type="checkbox" name="temp" />
      <label htmlFor="temp">Temperature</label><br />
      <input id='rain' type="checkbox" name="rain" />
      <label htmlFor="rain">Rain</label><br />
      <button type="submit" className="text-3xl">
        Show!
      </button>
    </form>
  )
}

export { Form }