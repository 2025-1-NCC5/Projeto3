import pandas as pd

def main():
    print("=== Sistema de Feedback 360° ===")
    n = int(input("Quantas pessoas na equipe? "))
    pessoas = []
    for i in range(n):
        nome = input(f"Nome da pessoa {i+1}: ")
        pessoas.append(nome)

    soft_skills = ["comunicacao", "empatia", "lideranca"]
    feedbacks = []

    for pessoa in pessoas:
        print(f"\nFeedback para {pessoa}:")
        notas = {}
        for skill in soft_skills:
            nota = int(input(f"Nota para {skill} (1-10): "))
            notas[skill] = nota
        comentario = input("Comentário: ")
        feedbacks.append({
            "nome": pessoa,
            **notas,
            "comentario": comentario
        })

    df = pd.DataFrame(feedbacks)
    print("\n=== Relatório Gerado ===")
    print(df)
    df.to_csv("relatorio.csv", index=False)
    print("\nRelatório salvo como relatorio.csv")

if __name__ == "__main__":
    main()