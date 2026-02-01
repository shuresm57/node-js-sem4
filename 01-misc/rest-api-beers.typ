#set text(16pt, font: "New Computer Modern")
#set par(justify: true, leading: 0.58em)
#set page(header: [
  #set text(size: 12pt)
  _Valdemar Støvring Storgaard_
  #h(1fr)
  Erhvervsakademi København 🍺
])

#set page(numbering: "- 1 -")
#show table.cell.where(y: 0): set text(weight: "bold")

= Rest API Design - Beers

#align(center)[
#table(
  align:left,
  columns: 3,
  [Endpoint],[Method],[Description],
  [/beers],[GET],[Retrieve all beer resources.],
  [/beers/{id}],[GET],[Retrieve a beer resource by id.],
  [/beers],[POST],[Create a beer resource.],
  [/beers/{id}],[PUT],[Update a beer resource.],
  [/beers/{id}],[PATCH],[Update parts of a beer resource],
  [/beers/{id}],[DELETE],[Delete a beer resource.],
  )
]
#align(center)[
  #image("imgs/v289t8f42idg1.jpeg")
]

