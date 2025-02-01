

function CategoryBox({ title, items }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="aspect-square relative overflow-hidden rounded-md bg-gray-50">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-sm text-gray-600">{item.title}</p>
          </div>
        ))}
      </div>
      <a href="#" className="text-orange-600 hover:underline block mt-4">
        Explore more
      </a>
    </div>
  )
}

export default function ItemBanner() {
  const categories = [
    {
      title: "Discover the latest trends",
      items: [
        {
          title: "Sunglass",
          image: "group101.webp",
        },
        {
          title: "Hat",
          image: "goup102.jpg",
        },
        {
          title: "classy bag",
          image: "group104.webp",
        },
        {
          title: "stylish boot",
          image: "group105.webp",
        },
      ],
    },
    {
      title: "Dress styles for every girl",
      items: [
        {
          title: "Lehnga choli",
          image: "group201.webp",
        },
        {
          title: "Gown with belt",
          image: "group202.webp",
        },
        {
          title: "Long sleeve dress",
          image: "group203.jpg",
        },
        {
          title: "Border with Saree",
          image: "group204.webp",
        },
      ],
    },
    {
      title: "Sparkling jewelry for girl's",
      items: [
        {
          title: "Necklace set",
          image: "group301.jpg",
        },
        {
          title: "Bangles",
          image: "group302.webp",
        },
        {
          title: "Silver Earing",
          image: "group303.webp",
        },
        {
          title: "Wedding Ring",
          image: "group304.avif",
        },
      ],
    },
    {
      title: "Radiant Beauty cosmetics",
      items: [
        {
          title: "Manicur & Make-up",
          image: "group401.webp",
        },
        {
          title: "Red lipstick",
          image: "group402.webp",
        },
        {
          title: "cotton pad",
          image: "group403.webp",
        },
        {
          title: "topical leaves",
          image: "group404.webp",
        },
      ],
    },
  ]

  return (
    <>
    <div className="">
      <h1 className="font-semibold text-center text-3xl ">More Shopping</h1>
      <p className="py-2 text-center">Shop more, style more—endless trends await!</p>
    <main className="min-h-screen bg-gray-50 py-12">

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryBox key={index} {...category} />
          ))}
        </div>
      </div>
    </main>
    </div>
    </>
  )
}

