import Foundation

class ChatService {
    static let shared = ChatService()
    private init() {}

    let baseURL = URL(string: "http://localhost:3000")!

    struct ChatResponse: Codable {
        let reply: String?
        let error: String?
    }

    func send(message: String, completion: @escaping (Result<String, Error>) -> Void) {
        let url = baseURL.appendingPathComponent("/chat")
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let payload = ["message": message]
        do {
            req.httpBody = try JSONEncoder().encode(payload)
        } catch {
            completion(.failure(error)); return
        }

        URLSession.shared.dataTask(with: req) { data, resp, err in
            if let err = err { completion(.failure(err)); return }
            guard let data = data else { completion(.failure(NSError(domain:"",code:0,userInfo:[NSLocalizedDescriptionKey:"No data"]))); return }
            do {
                let cr = try JSONDecoder().decode(ChatResponse.self, from: data)
                if let reply = cr.reply { completion(.success(reply)) }
                else if let e = cr.error { completion(.failure(NSError(domain:"",code:0,userInfo:[NSLocalizedDescriptionKey:e]))) }
                else { completion(.failure(NSError(domain:"",code:0,userInfo:[NSLocalizedDescriptionKey:"Unknown response"]))) }
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }

    // Context management
    struct Context: Codable {
        var name: String
        var description: String
        var customInstructions: String
    }

    func loadContext(completion: @escaping (Result<Context, Error>) -> Void) {
        let url = baseURL.appendingPathComponent("/context")
        URLSession.shared.dataTask(with: url) { data, _, err in
            if let err = err { completion(.failure(err)); return }
            guard let data = data else { completion(.failure(NSError(domain:"",code:0,userInfo:[NSLocalizedDescriptionKey:"No data"]))); return }
            do {
                let c = try JSONDecoder().decode(Context.self, from: data)
                completion(.success(c))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }

    func saveContext(_ ctx: Context, completion: @escaping (Result<Void, Error>) -> Void) {
        let url = baseURL.appendingPathComponent("/context")
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        do {
            req.httpBody = try JSONEncoder().encode(ctx)
        } catch { completion(.failure(error)); return }
        URLSession.shared.dataTask(with: req) { _, resp, err in
            if let err = err { completion(.failure(err)); return }
            completion(.success(()))
        }.resume()
    }
}
