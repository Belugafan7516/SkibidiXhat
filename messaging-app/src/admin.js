async function checkAdmin(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || data.role !== 'admin') {
    alert("Access denied. Admins only.")
    window.location.href = "/"
  }
}