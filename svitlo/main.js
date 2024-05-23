(function() {
  const getData = async () => {
    const url = 'https://svitlo.oe.if.ua/GAVTurnOff/GavGroupByAccountNumber';
    const body = 'accountNumber=&userSearchChoice=pob&address=%D0%9A%D1%80%D0%B8%D1%85%D1%96%D0%B2%D1%86%D1%96%2C%D0%9F%D1%80%D0%B8%D0%BE%D0%B7%D0%B5%D1%80%D0%BD%D0%B0%2C57';
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9,uk-UA;q=0.8,uk;q=0.7',
        'Connection': 'keep-alive',
      },
      body,
    });

    return data?.json();
  }

  const renderGraph = async (id, data) => {
    if (!data) {
      return false;
    }

    const parent = document.querySelector(`#${id}`);
    const graph = [];
    data.hoursList.forEach((i) => graph.push(`<div class="slot hour status-${i.electricity}">${+i.hour-1}-${i.hour}</div>`));
    parent.innerHTML = graph.join('\n')

    parent.removeAttribute('hidden');
  }

  getData().then(data => {
    renderGraph('today', data?.graphs?.today);
    renderGraph('tomorrow', data?.graphs?.tomorrow);
  })
})();
