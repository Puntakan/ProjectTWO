const getHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/history')
      if (res.ok) {
        const historys = await res.json()
        return historys
      } else {
        throw new Error('Error')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  export { getHistory }