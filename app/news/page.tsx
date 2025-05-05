import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const featuredNews = {
  id: 101,
  title: "AI Breakthrough: New Model Achieves Human-Level Understanding in Complex Tasks",
  excerpt: "Researchers have developed a new AI system that demonstrates unprecedented capabilities in comprehending and solving complex problems, marking a significant milestone in artificial intelligence development.",
  category: "Technology",
  date: new Date(2023, 11, 28),
  image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

const newsByCategory = {
  technology: [
    {
      id: 102,
      title: "Tech Giants Announce Joint Initiative to Combat Climate Change",
      excerpt: "Major technology companies have formed a coalition to reduce carbon emissions and promote sustainable practices across the industry.",
      date: new Date(2023, 11, 27),
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 103,
      title: "Quantum Computing Milestone: Error Correction Breakthrough",
      excerpt: "Scientists have demonstrated a new method for quantum error correction that could accelerate practical quantum computing.",
      date: new Date(2023, 11, 26),
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 104,
      title: "Smartphone Market Sees Shift as New Players Enter Premium Segment",
      excerpt: "The competitive landscape of high-end smartphones is changing with new manufacturers challenging established brands.",
      date: new Date(2023, 11, 25),
      image: "https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 105,
      title: "Revolutionary Battery Technology Promises Week-Long Phone Charge",
      excerpt: "A startup has unveiled a new battery design that could dramatically extend the battery life of portable electronics.",
      date: new Date(2023, 11, 24),
      image: "https://images.pexels.com/photos/906499/pexels-photo-906499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
  business: [
    {
      id: 106,
      title: "Global Supply Chain Disruptions Ease as New Logistics Networks Emerge",
      excerpt: "Companies are reporting improvements in supply chain resilience as new strategies and technologies address recent challenges.",
      date: new Date(2023, 11, 27),
      image: "https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 107,
      title: "Remote Work Policies Become Permanent at Major Corporations",
      excerpt: "Several Fortune 500 companies have announced long-term flexible work arrangements following successful remote work implementation.",
      date: new Date(2023, 11, 26),
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 108,
      title: "Sustainable Investing Reaches Record Levels as ESG Criteria Evolve",
      excerpt: "Investment in environmentally and socially responsible companies has reached unprecedented heights as standards become more rigorous.",
      date: new Date(2023, 11, 25),
      image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 109,
      title: "Retail Transformation: AI-Powered Shopping Experiences Take Center Stage",
      excerpt: "Traditional retailers are deploying advanced AI technologies to create personalized shopping experiences that bridge online and offline worlds.",
      date: new Date(2023, 11, 24),
      image: "https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
  science: [
    {
      id: 110,
      title: "New Species Discovered in Unexplored Deep Ocean Regions",
      excerpt: "Marine biologists have identified several previously unknown species during an expedition to deep-sea habitats.",
      date: new Date(2023, 11, 27),
      image: "https://images.pexels.com/photos/3100361/pexels-photo-3100361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 111,
      title: "Climate Research Reveals Faster Adaptation Required for Key Ecosystems",
      excerpt: "A comprehensive study indicates that several critical ecosystems may need to adapt more quickly than previously thought to survive climate shifts.",
      date: new Date(2023, 11, 26),
      image: "https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 112,
      title: "Space Telescope Captures Unprecedented Views of Distant Galaxy Formation",
      excerpt: "Astronomers have obtained the most detailed images yet of early galaxy formation, challenging existing models of cosmic evolution.",
      date: new Date(2023, 11, 25),
      image: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 113,
      title: "Medical Breakthrough: Gene Therapy Shows Promise for Degenerative Disorders",
      excerpt: "Clinical trials of a new gene therapy approach have demonstrated significant benefits for patients with previously untreatable conditions.",
      date: new Date(2023, 11, 24),
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
  health: [
    {
      id: 114,
      title: "New Guidelines Recommend Expanded Mental Health Screening",
      excerpt: "Health authorities have issued updated guidelines calling for broader mental health assessments during routine medical visits.",
      date: new Date(2023, 11, 27),
      image: "https://images.pexels.com/photos/697243/pexels-photo-697243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 115,
      title: "Study Links Specific Gut Bacteria to Improved Immune Response",
      excerpt: "Researchers have identified key microbiome components that may enhance immunity against common infections.",
      date: new Date(2023, 11, 26),
      image: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 116,
      title: "Global Initiative Launches to Address Healthcare Worker Shortage",
      excerpt: "An international coalition has announced a comprehensive plan to increase training and support for healthcare professionals worldwide.",
      date: new Date(2023, 11, 25),
      image: "https://images.pexels.com/photos/5863365/pexels-photo-5863365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 117,
      title: "Personalized Nutrition Plans Show Significant Health Benefits in Large Study",
      excerpt: "A long-term study demonstrates that tailored dietary recommendations based on individual factors lead to better health outcomes.",
      date: new Date(2023, 11, 24),
      image: "https://images.pexels.com/photos/5095881/pexels-photo-5095881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
};

export default function NewsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Latest News</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Stay informed with the most recent updates and breaking news across various fields.
        </p>
      </div>
      
      {/* Featured news */}
      <div className="mb-12">
        <div className="relative rounded-xl overflow-hidden">
          <div className="aspect-[21/9] relative">
            <Image
              src={featuredNews.image}
              alt={featuredNews.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="max-w-3xl">
                <Badge className="mb-4 bg-sky-500 hover:bg-sky-600">{featuredNews.category}</Badge>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  {featuredNews.title}
                </h2>
                <p className="text-white/80 mb-6 max-w-2xl">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">
                    {formatDistanceToNow(featuredNews.date, { addSuffix: true })}
                  </span>
                  <Link href={`/news/${featuredNews.id}`}>
                    <Button className="bg-sky-500 hover:bg-sky-600">
                      Read Full Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* News categories */}
      <Tabs defaultValue="technology" className="mb-6">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="technology">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsByCategory.technology.map((news, index) => (
              <NewsCard key={news.id} news={news} featured={index === 0} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="business">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsByCategory.business.map((news, index) => (
              <NewsCard key={news.id} news={news} featured={index === 0} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="science">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsByCategory.science.map((news, index) => (
              <NewsCard key={news.id} news={news} featured={index === 0} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="health">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsByCategory.health.map((news, index) => (
              <NewsCard key={news.id} news={news} featured={index === 0} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NewsCard({ news, featured }: { news: any, featured: boolean }) {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`flex ${featured ? 'flex-col md:flex-row' : 'flex-col'}`}>
        <div className={`${featured ? 'md:w-1/2' : 'w-full'}`}>
          <div className="aspect-video relative">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <CardContent className={`p-4 ${featured ? 'md:w-1/2' : 'w-full'}`}>
          <div className="flex flex-col h-full">
            <div className="mb-2 text-sm text-muted-foreground">
              {formatDistanceToNow(news.date, { addSuffix: true })}
            </div>
            
            <Link href={`/news/${news.id}`}>
              <h3 className={`font-bold mb-2 hover:text-sky-500 transition-colors ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                {news.title}
              </h3>
            </Link>
            
            <p className="text-muted-foreground line-clamp-3 mb-4">
              {news.excerpt}
            </p>
            
            <div className="mt-auto">
              <Link href={`/news/${news.id}`}>
                <Button variant="outline" size="sm">
                  Read more
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}