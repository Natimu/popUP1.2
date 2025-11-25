//
//  popUPWidget.swift
//  popUPWidget
//
//  Updated for background rotation + optimized quote loading
//

import WidgetKit
import SwiftUI

// MARK: - Data Models

struct Quote: Codable, Hashable {
    let quote: String
    let by: String
}

struct WidgetSettings: Codable {
    let selectedFolder: String
    let interval: Int   // minutes
}

// MARK: - Timeline Entry (includes background)

struct QuoteEntry: TimelineEntry {
    let date: Date
    let quote: Quote
    let background: String     // image name
}

// MARK: - Provider

struct QuoteProvider: TimelineProvider {

    private let appGroupID = "group.com.nati04.popUP"
  
    private let staticQuotes: [Quote] = [
          Quote(quote: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me. ", by: "Galatians 2:20"),
          Quote(quote: "\"When the Son of Man comes in his glory, and all the angels with him, he will sit on his glorious throne.\" ", by: "Matthew 25:31"),
          Quote(quote: "\"Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them.\" ", by: "Matthew 5:17"),
          Quote(quote: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ. ", by: "Romans 10:17"),
          Quote(quote: "But seek first his kingdom and his righteousness, and all these things will be given to you as well. ", by: "Matthew 6:33"),
          Quote(quote: "\"The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free,\" ", by: "Luke 4:18"),
          Quote(quote: "But when he, the Spirit of truth, comes, he will guide you into all the truth. He will not speak on his own; he will speak only what he hears, and he will tell you what is yet to come. ", by: "John 16:13"),
          Quote(quote: "Keep watch over yourselves and all the flock of which the Holy Spirit has made you overseers. Be shepherds of the church of God, which he bought with his own blood. ", by: "Acts 20:28"),
          Quote(quote: "For the grace of God has appeared that offers salvation to all people. ", by: "Titus 2:11"),
          Quote(quote: "You belong to your father, the devil, and you want to carry out your father's desires. He was a murderer from the beginning, not holding to the truth, for there is no truth in him. When he lies, he speaks his native language, for he is a liar and the father of lies. ", by: "John 8:44"),
          Quote(quote: "Finally, be strong in the Lord and in his mighty power. ", by: "Ephesians 6:10"),
          Quote(quote: "Let everyone be subject to the governing authorities, for there is no authority except that which God has established. The authorities that exist have been established by God. ", by: "Romans 13:1"),
          Quote(quote: "So he made a whip out of cords, and drove all from the temple courts, both sheep and cattle; he scattered the coins of the money changers and overturned their tables. ", by: "John 2:15"),
          Quote(quote: "Whoever believes and is baptized will be saved, but whoever does not believe will be condemned. ", by: "Mark 16:16"),
          Quote(quote: "As it is written: \"There is no one righteous, not even one;\" ", by: "Romans 3:10"),
          Quote(quote: "\"And I will put enmity between you and the woman, and between your offspring and hers; he will crush your head, and you will strike his heel.\" ", by: "Genesis 3:15"),
          Quote(quote: "And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him. ", by: "Hebrews 11:6"),
          Quote(quote: "But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you. ", by: "John 14:26"),
          Quote(quote: "\"Very truly I tell you, whoever hears my word and believes him who sent me has eternal life and will not be judged but has crossed over from death to life.\" ", by: "John 5:24"),
          Quote(quote: "\"And afterward, I will pour out my Spirit on all people. Your sons and daughters will prophesy, your old men will dream dreams, your young men will see visions.\" ", by: "Joel 2:28"),
          Quote(quote: "Then God said, \"Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds.\" And it was so. ", by: "Genesis 1:11"),
          Quote(quote: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds ", by: "James 1:2"),
          Quote(quote: "The Son is the image of the invisible God, the firstborn over all creation. ", by: "Colossians 1:15"),
          Quote(quote: "Jesus replied: \"Love the Lord your God with all your heart and with all your soul and with all your mind.'\" ", by: "Matthew 22:37"),
          Quote(quote: "While we wait for the blessed hope – the appearing of the glory of our great God and Savior, Jesus Christ ", by: "Titus 2:13"),
          Quote(quote: "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable – if anything is excellent or praiseworthy – think about such things. ", by: "Philippians 4:8"),
          Quote(quote: "After he said this, he was taken up before their very eyes, and a cloud hid him from their sight. ", by: "Acts 1:9"),
          Quote(quote: "When a Samaritan woman came to draw water, Jesus said to her, \"Will you give me a drink?\" ", by: "John 4:7"),
          Quote(quote: "He has shown all you people what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God. ", by: "Micah 6:8"),
          Quote(quote: "Sanctify them by the truth; your word is truth. ", by: "John 17:17"),
          Quote(quote: "\"Do not have sexual relations with a man as one does with a woman; that is detestable.\" ", by: "Leviticus 18:22"),
          Quote(quote: "On the first day of the week we came together to break bread. Paul spoke to the people and, because he intended to leave the next day, kept on talking until midnight. ", by: "Acts 20:7"),
          Quote(quote: "They replied, \"Believe in the Lord Jesus, and you will be saved – you and your household.\" ", by: "Acts 16:31"),
          Quote(quote: "Jesus said to her, \"I am the resurrection and the life. Anyone who believes in me will live, even though they die;\" ", by: "John 11:25"),
          Quote(quote: "\"Very truly I tell you,\" Jesus answered, \"before Abraham was born, I am!\" ", by: "John 8:58"),
          Quote(quote: "All of them were filled with the Holy Spirit and began to speak in other tongues as the Spirit enabled them. ", by: "Acts 2:4"),
          Quote(quote: "\"I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.\" ", by: "John 15:5"),
          Quote(quote: "Those who accepted his message were baptized, and about three thousand were added to their number that day. ", by: "Acts 2:41"),
          Quote(quote: "Start children off on the way they should go, and even when they are old they will not turn from it. ", by: "Proverbs 22:6"),
          Quote(quote: "Now the serpent was more crafty than any of the wild animals the LORD God had made. He said to the woman, \"Did God really say, 'You must not eat from any tree in the garden'?\" ", by: "Genesis 3:1"),
          Quote(quote: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you. ", by: "James 1:5"),
          Quote(quote: "In the past God spoke to our ancestors through the prophets at many times and in various ways ", by: "Hebrews 1:1"),
          Quote(quote: "Because of the truth, which lives in us and will be with us forever: ", by: "2 John 1:2"),
          Quote(quote: "Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent. ", by: "John 17:3"),
          Quote(quote: "\"There was a rich man who was dressed in purple and fine linen and lived in luxury every day.\" ", by: "Luke 16:19"),
          Quote(quote: "\"Sir,\" the invalid replied, \"I have no one to help me into the pool when the water is stirred. While I am trying to get in, someone else goes down ahead of me.\" ", by: "John 5:7"),
          Quote(quote: "To the Jews who had believed him, Jesus said, \"If you hold to my teaching, you are really my disciples.\" ", by: "John 8:31"),
          Quote(quote: "So that you may know the certainty of the things you have been taught. ", by: "Luke 1:4"),
          Quote(quote: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with them, and they with me. ", by: "Revelation 3:20"),
          Quote(quote: "Now that you have tasted that the Lord is good. ", by: "1 Peter 2:3"),
          Quote(quote: "\"I and the Father are one.\" ", by: "John 10:30"),
          Quote(quote: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect ", by: "1 Peter 3:15"),
          Quote(quote: "\"Not everyone who says to me, 'Lord, Lord,' will enter the kingdom of heaven, but only those who do the will of my Father who is in heaven.\" ", by: "Matthew 7:21"),
          Quote(quote: "Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son. ", by: "John 3:18"),
          Quote(quote: "The LORD had said to Abram, \"Go from your country, your people and your father's household to the land I will show you.\" ", by: "Genesis 12:1"),
          Quote(quote: "\"The wind blows wherever it pleases. You hear its sound, but you cannot tell where it comes from or where it is going. So it is with everyone born of the Spirit.\" ", by: "John 3:8"),
          Quote(quote: "\"I am the true vine, and my Father is the gardener.\" ", by: "John 15:1"),
          Quote(quote: "Then the LORD God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being. ", by: "Genesis 2:7"),
          Quote(quote: "And God said, \"Let there be light,\" and there was light. ", by: "Genesis 1:3"),
          Quote(quote: "When Jesus spoke again to the people, he said, \"I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.\" ", by: "John 8:12"),
          Quote(quote: "But you are a chosen people, a royal priesthood, a holy nation, God's special possession, that you may declare the praises of him who called you out of darkness into his wonderful light. ", by: "1 Peter 2:9"),
          Quote(quote: "In the sixth month of Elizabeth's pregnancy, God sent the angel Gabriel to Nazareth, a town in Galilee ", by: "Luke 1:26"),
          Quote(quote: "Just as people are destined to die once, and after that to face judgment ", by: "Hebrews 9:27"),
          Quote(quote: "He came to Jesus at night and said, \"Rabbi, we know that you are a teacher who has come from God. For no one could perform the signs you are doing if God were not with him.\" ", by: "John 3:2"),
          Quote(quote: "\"You are the light of the world. A city on a hill cannot be hidden.\" ", by: "Matthew 5:14"),
          Quote(quote: "\"God said to Moses, \"I AM WHO I AM. This is what you are to say to the Israelites: 'I AM has sent me to you.\"\" ", by: "Exodus 3:14"),
          Quote(quote: "Or do you not know that wrongdoers will not inherit the kingdom of God? Do not be deceived: Neither the sexually immoral nor idolaters nor adulterers nor male prostitutes nor practicing homosexuals ", by: "1 Corinthians 6:9"),
          Quote(quote: "On one occasion an expert in the law stood up to test Jesus. \"Teacher,\" he asked, \"what must I do to inherit eternal life?\" ", by: "Luke 10:25"),
          Quote(quote: "\"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.\" ", by: "Matthew 7:7"),
          Quote(quote: "He himself was not the light; he came only as a witness to the light. ", by: "John 1:8"),
          Quote(quote: "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ. ", by: "Ephesians 1:3"),
          Quote(quote: "This is how the birth of Jesus the Messiah came about: His mother Mary was pledged to be married to Joseph, but before they came together, she was found to be pregnant through the Holy Spirit. ", by: "Matthew 1:18"),
          Quote(quote: "For since the creation of the world God's invisible qualities – his eternal power and divine nature – have been clearly seen, being understood from what has been made, so that people are without excuse. ", by: "Romans 1:20"),
          Quote(quote: "At this, those who heard began to go away one at a time, the older ones first, until only Jesus was left, with the woman still standing there. ", by: "John 8:9"),
          Quote(quote: "The light shines in the darkness, and the darkness has not overcome it. ", by: "John 1:5"),
          Quote(quote: "Brothers and sisters, we do not want you to be uninformed about those who sleep in death, so that you do not grieve like the rest, who have no hope. ", by: "1 Thessalonians 4:13"),
          Quote(quote: "Keep your lives free from the love of money and be content with what you have, because God has said, \"Never will I leave you; never will I forsake you.\" ", by: "Hebrews 13:5"),
          Quote(quote: "Dear friends, do not believe every spirit, but test the spirits to see whether they are from God, because many false prophets have gone out into the world. ", by: "1 John 4:1"),
          Quote(quote: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows. ", by: "James 1:17"),
          Quote(quote: "\"Do not store up for yourselves treasures on earth, where moth and rust destroy, and where thieves break in and steal.\" ", by: "Matthew 6:19"),
          Quote(quote: "The Spirit of the Sovereign LORD is on me, because the LORD has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners, ", by: "Isaiah 61:1"),
          Quote(quote: "There is neither Jew nor Gentile, neither slave nor free, neither male nor female, for you are all one in Christ Jesus. ", by: "Galatians 3:28"),
          Quote(quote: "The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you, not wanting anyone to perish, but everyone to come to repentance. ", by: "2 Peter 3:9"),
          Quote(quote: "\"Men of Galilee, \" they said, \"why do you stand here looking into the sky? This same Jesus, who has been taken from you into heaven, will come back in the same way you have seen him go into heaven.\" ", by: "Acts 1:11"),
          Quote(quote: "Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord. ", by: "James 5:14"),
          Quote(quote: "Whoever believes in the Son has eternal life, but whoever rejects the Son will not see life, for God's wrath remains on them. ", by: "John 3:36"),
          Quote(quote: "For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms. ", by: "Ephesians 6:12"),
          Quote(quote: "\"This, then, is how you should pray: \"Our Father in heaven, hallowed be your name,\"\" ", by: "Matthew 6:9"),
          Quote(quote: "Repent, then, and turn to God, so that your sins may be wiped out, that times of refreshing may come from the Lord ", by: "Acts 3:19"),
          Quote(quote: "What good is it, my brothers and sisters, if people claim to have faith but have no deeds? Can such faith save them? ", by: "James 2:14"),
          Quote(quote: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint. ", by: "Isaiah 40:31"),
          Quote(quote: "For God did not send his Son into the world to condemn the world, but to save the world through him. ", by: "John 3:17"),
          Quote(quote: "The angel answered, \"The Holy Spirit will come on you, and the power of the Most High will overshadow you. So the holy one to be born will be called the Son of God.\" ", by: "Luke 1:35"),
          Quote(quote: "God blessed them and said to them, \"Be fruitful and increase in number; fill the earth and subdue it. Rule over the fish in the sea and the birds in the sky and over every living creature that moves on the ground.\" ", by: "Genesis 1:28"),
          Quote(quote: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do. ", by: "Ephesians 2:10"),
          Quote(quote: "God made him who had no sin to be sin for us, so that in him we might become the righteousness of God. ", by: "2 Corinthians 5:21"),
          Quote(quote: "What shall we say, then? Shall we go on sinning so that grace may increase? ", by: "Romans 6:1"),
          Quote(quote: "And you also were included in Christ when you heard the word of truth, the gospel of your salvation. When you believed, you were marked in him with a seal, the promised Holy Spirit ", by: "Ephesians 1:13"),
          Quote(quote: "Or don't you know that all of us who were baptized into Christ Jesus were baptized into his death? ", by: "Romans 6:3"),
          Quote(quote: "\"If a brother or sister sins, go and point out the fault, just between the two of you. If they listen to you, you have won them over.\" ", by: "Matthew 18:15"),
          Quote(quote: "They are from the world and therefore speak from the viewpoint of the world, and the world listens to them. ", by: "1 John 4:5"),
          Quote(quote: "In those days Caesar Augustus issued a decree that a census should be taken of the entire Roman world. ", by: "Luke 2:1"),
          Quote(quote: "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world. ", by: "James 1:27"),
          Quote(quote: "\"I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.\" ", by: "John 16:33"),
          Quote(quote: "\"Do not be amazed at this, for a time is coming when all who are in their graves will hear his voice\" ", by: "John 5:28"),
          Quote(quote: "You study the Scriptures diligently because you think that in them you possess eternal life. These are the very Scriptures that testify about me, ", by: "John 5:39"),
          Quote(quote: "Likewise, teach the older women to be reverent in the way they live, not to be slanderers or addicted to much wine, but to teach what is good. ", by: "Titus 2:3"),
          Quote(quote: "Yet a time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks. ", by: "John 4:23"),
          Quote(quote: "\"Do not judge, or you too will be judged.\" ", by: "Matthew 7:1"),
          Quote(quote: "For there is one God and one mediator between God and human beings, Christ Jesus, himself human ", by: "1 Timothy 2:5"),
          Quote(quote: "Then Jesus was led by the Spirit into the wilderness to be tempted by the devil. ", by: "Matthew 4:1"),
          Quote(quote: "No one has ever seen God, but the one and only Son, who is himself God and is in closest relationship with the Father, has made him known. ", by: "John 1:18"),
          Quote(quote: "As a prisoner for the Lord, then, I urge you to live a life worthy of the calling you have received. ", by: "Ephesians 4:1"),
          Quote(quote: "Some time later, Jesus went up to Jerusalem for one of the Jewish festivals. ", by: "John 5:1"),
          Quote(quote: "Do not get drunk on wine, which leads to debauchery. Instead, be filled with the Spirit ", by: "Ephesians 5:18"),
          Quote(quote: "Wives, submit yourselves to your own husbands as you do to the Lord. ", by: "Ephesians 5:22"),
          Quote(quote: "Then I saw \"a new heaven and a new earth,\" for the first heaven and the first earth had passed away, and there was no longer any sea. ", by: "Revelation 21:1"),
          Quote(quote: "\"But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel, whose origins are from of old, from ancient times.\" ", by: "Micah 5:2"),
          Quote(quote: "They will say, \"Where is this 'coming' he promised? Ever since our ancestors died, everything goes on as it has since the beginning of creation.\" ", by: "2 Peter 3:4"),
          Quote(quote: "\"No one can come to me unless the Father who sent me draws them, and I will raise them up at the last day.\" ", by: "John 6:44"),
          Quote(quote: "On the evening of that first day of the week, when the disciples were together, with the doors locked for fear of the Jewish leaders, Jesus came and stood among them and said, \"Peace be with you!\" ", by: "John 20:19"),
          Quote(quote: "Nun. Your word is a lamp to my feet and a light for my path. ", by: "Psalms 119:105"),
          Quote(quote: "The LORD God said, \"It is not good for the man to be alone. I will make a helper suitable for him.\" ", by: "Genesis 2:18"),
          Quote(quote: "But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus, his Son, purifies us from all sin. ", by: "1 John 1:7"),
          Quote(quote: "For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, ", by: "1 Corinthians 15:3"),
          Quote(quote: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed. ", by: "Isaiah 53:5"),
          Quote(quote: "In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God's grace ", by: "Ephesians 1:7"),
          Quote(quote: "Husbands, love your wives, just as Christ loved the church and gave himself up for her ", by: "Ephesians 5:25"),
          Quote(quote: "You, however, are not controlled by the sinful nature but are in the Spirit, if indeed the Spirit of God lives in you. And if anyone does not have the Spirit of Christ, they do not belong to Christ. ", by: "Romans 8:9"),
          Quote(quote: "Greater love has no one than this: to lay down one's life for one's friends. ", by: "John 15:13"),
          Quote(quote: "So I say, walk by the Spirit, and you will not gratify the desires of the sinful nature. ", by: "Galatians 5:16"),
          Quote(quote: "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up ", by: "John 3:14"),
          Quote(quote: "\"How can anyone be born when they are old? \" Nicodemus asked. \"Surely they cannot enter a second time into their mother's womb to be born!\" ", by: "John 3:4"),
      ]

    // Available background images in Assets.xcassets
    private let backgrounds = [
        "bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7"
    ]

    func placeholder(in context: Context) -> QuoteEntry {
        QuoteEntry(
            date: Date(),
            quote: Quote(quote: "Loading…", by: ""),
            background: "bg1"
        )
    }

    func getSnapshot(in context: Context,
                     completion: @escaping (QuoteEntry) -> Void) {
        completion(randomQuoteEntry())
    }

    func getTimeline(in context: Context,
                     completion: @escaping (Timeline<QuoteEntry>) -> Void) {

        let entry = randomQuoteEntry()
        let refreshDate = Date().addingTimeInterval(loadInterval())

        let timeline = Timeline(
            entries: [entry],
            policy: .after(refreshDate)
        )

        completion(timeline)
    }

    // MARK: - Load Quotes

  private func loadQuotes() -> [Quote] {
      // Try App Group container (dynamic mode)
      if let container = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupID) {
          let fileURL = container.appendingPathComponent("widget_quotes.json")

          if let data = try? Data(contentsOf: fileURL),
             let quotes = try? JSONDecoder().decode([Quote].self, from: data),
             !quotes.isEmpty {
              print("Widget running in DYNAMIC MODE")
              return quotes  // Dynamic mode success
          }
      }

      //If reach here: using static mode
      print("Widget running in STATIC MODE")
      return staticQuotes
  }

    // MARK: - Load Settings

    private func loadInterval() -> TimeInterval {
      // Try App Group container (dynamic mode)
          if let container = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupID) {
              let fileURL = container.appendingPathComponent("widgetSettings.json")

              if let data = try? Data(contentsOf: fileURL),
                 let settings = try? JSONDecoder().decode(WidgetSettings.self, from: data) {
                  return TimeInterval(settings.interval * 60)
              }
          }

          // Static fallback refresh every 30 minutes
          return 120
    }

    // MARK: - Build Entry (Random quote + random background)

    private func randomQuoteEntry() -> QuoteEntry {
        let quotes = loadQuotes()
        let quote = quotes.randomElement()
            ?? Quote(quote: "Add quotes in widget settings", by: "")

        let bg = backgrounds.randomElement() ?? "bg1"

        return QuoteEntry(date: Date(), quote: quote, background: bg)
    }
}


// MARK: - View

struct QuoteWidgetView: View {
    let entry: QuoteEntry

    var body: some View {
        ZStack {
            // Background image
            Image(entry.background)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .overlay(
                    Rectangle()
                        .fill(
                            LinearGradient(
                                gradient: Gradient(colors: [Color.black.opacity(0.4), Color.clear]),
                                startPoint: .bottom,
                                endPoint: .top
                            )
                        )
                )
                .clipped()
                .ignoresSafeArea()


            // Text overlay
            VStack(alignment: .leading, spacing: 8) {
              Spacer()
              ZStack {
                  // Outline (shadow)
                  Text(entry.quote.quote)
                      .font(.headline)
                      .foregroundColor(.black)
                      .lineLimit(7)
                      .shadow(color: .black.opacity(0.8), radius: 2, x: 0, y: 0)
                

                  // Main text
                  Text(entry.quote.quote)
                      .font(.headline)
                      .lineLimit(7)
                      .foregroundColor(.white)
              }


                if !entry.quote.by.isEmpty {
                  
                  ZStack {
                    // Outline (shadow)
                    Text(" \(entry.quote.by)")
                      .font(.footnote)
                      .foregroundColor(.white)
                      .shadow(color: .black.opacity(0.8), radius: 2, x: 0, y: 0)
                    
                    Text(" \(entry.quote.by)")
                      .font(.footnote)
                      .foregroundColor(.black.opacity(0.85))
                      .shadow(radius: 2)
                  }
                }
              Spacer()
            }
            .padding()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .edgesIgnoringSafeArea(.all)
        .containerBackground(.clear, for: .widget)  // iOS 17/18 requirement
    }
}


// MARK: - Widget

@main
struct popUPWidget: Widget {
    let kind = "popUPWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind,
                            provider: QuoteProvider()) { entry in
            QuoteWidgetView(entry: entry)
                .containerBackground(.clear, for: .widget)
        }
        .supportedFamilies([.systemMedium])
        .configurationDisplayName("Daily Quote")
        .description("Shows rotating quotes from your selected folder.")
    }
}
