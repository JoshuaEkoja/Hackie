import SwiftUI

struct Message: Identifiable, Codable {
    var id = UUID()
    var role: String
    var text: String
}

struct ContentView: View {
    @State private var messages: [Message] = [Message(role: "assistant", text: "Hi — I'm your HackBase assistant. Ask me anything about the hackathon." )]
    @State private var inputText: String = ""
    @State private var showingContext = false
    @State private var isSending = false

    var body: some View {
        NavigationView {
            VStack(spacing: 12) {
                ScrollViewReader { proxy in
                    ScrollView {
                        VStack(spacing: 8) {
                            ForEach(messages) { m in
                                MessageRow(message: m)
                            }
                        }
                        .padding()
                    }
                    .onChange(of: messages.count) { _ in
                        if let last = messages.last { proxy.scrollTo(last.id, anchor: .bottom) }
                    }
                }

                HStack(spacing: 8) {
                    TextField("Ask about the hackathon...", text: $inputText)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .disabled(isSending)

                    Button(action: send) {
                        Text(isSending ? "…" : "Send")
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding([.leading,.trailing,.bottom])
            }
            .navigationTitle("HackBase")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingContext = true }) { Text("Context") }
                }
            }
            .sheet(isPresented: $showingContext) {
                ContextView()
            }
        }
    }

    func send() {
        let text = inputText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { return }
        let userMsg = Message(role: "user", text: text)
        messages.append(userMsg)
        inputText = ""
        isSending = true

        ChatService.shared.send(message: text) { result in
            DispatchQueue.main.async {
                isSending = false
                switch result {
                case .success(let reply):
                    let assistant = Message(role: "assistant", text: reply)
                    messages.append(assistant)
                case .failure(let err):
                    let errMsg = Message(role: "assistant", text: "Error: \(err.localizedDescription)")
                    messages.append(errMsg)
                }
            }
        }
    }
}

struct MessageRow: View {
    let message: Message
    var body: some View {
        HStack {
            if message.role == "assistant" { AvatarView(icon: "🤖") }
            Text(message.text)
                .padding(10)
                .background(message.role == "assistant" ? Color(.systemGray6) : Color.blue.opacity(0.9))
                .foregroundColor(message.role == "assistant" ? .primary : .white)
                .cornerRadius(12)
            if message.role == "user" { AvatarView(icon: "A") }
        }
        .frame(maxWidth: .infinity, alignment: message.role == "assistant" ? .leading : .trailing)
        .id(message.id)
    }
}

struct AvatarView: View {
    let icon: String
    var body: some View {
        Text(icon)
            .frame(width: 36, height: 36)
            .background(Color(.systemGray5))
            .clipShape(Circle())
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
