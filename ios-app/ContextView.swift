import SwiftUI

struct ContextView: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var name = ""
    @State private var description = ""
    @State private var saving = false

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Hackathon")) {
                    TextField("Name", text: $name)
                    TextEditor(text: $description).frame(height:120)
                }
                Section {
                    Button(action: save) { HStack{ Spacer(); if saving { ProgressView() } else { Text("Save") }; Spacer() } }
                    Button(action: reset) { HStack{ Spacer(); Text("Reset"); Spacer() } }.foregroundColor(.red)
                }
            }
            .navigationTitle("Context")
            .navigationBarItems(trailing: Button("Close") { presentationMode.wrappedValue.dismiss() })
            .onAppear(perform: load)
        }
    }

    func load() {
        ChatService.shared.loadContext { res in
            DispatchQueue.main.async {
                switch res {
                case .success(let ctx): name = ctx.name; description = ctx.description
                case .failure(_): break
                }
            }
        }
    }

    func save() {
        saving = true
        let ctx = ChatService.Context(name: name, description: description, customInstructions: "")
        ChatService.shared.saveContext(ctx) { res in
            DispatchQueue.main.async {
                saving = false
                switch res {
                case .success(): presentationMode.wrappedValue.dismiss()
                case .failure(let err): print("Save error", err)
                }
            }
        }
    }

    func reset() {
        // call reset endpoint
        guard let url = URL(string: "http://localhost:3000/context/reset") else { return }
        var req = URLRequest(url: url); req.httpMethod = "POST"
        URLSession.shared.dataTask(with: req) { _,_,_ in
            DispatchQueue.main.async { name = ""; description = "" }
        }.resume()
    }
}

struct ContextView_Previews: PreviewProvider {
    static var previews: some View { ContextView() }
}
