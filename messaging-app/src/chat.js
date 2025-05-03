async function sendMessage(content, userId) {
  const { error, status } = await supabase.from('messages').insert({
    content: content,
    sender_id: userId
  })
  if (error) {
    alert(`Error (${status}): ${error.message}`)
  } else {
    alert(`Success (${status})`)
  }
}