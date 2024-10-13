const sendResponseBack = async (req, res, submittedData) => {
  console.log(`DEBUG ${submittedData}`);
  if (submittedData) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "200 Success",
        data: submittedData,
      })
    );
  } else {
    // If no data has been submitted yet, send an empty response
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "No data available" }));
  }
};

export default sendResponseBack;
