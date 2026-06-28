from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from validators.api_validator import ChatRequest
# from services.rag_llm import query_chain
from services.rag_llm import conversational_rag_chain


app = FastAPI(title='Rag-Me-Knowme API Endpoint', description='API Endpoint for Rag-Me AI Web App')

# setting up CORS middlwwares
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Function for saving/append the LLM responses to a text file for analysis
def save_llm_response_to_disk(question: str, response: str):
    with open("LLM_Response_Store_File.txt", "a", encoding="utf-8") as f:
        temp = "## " + question
        f.write(temp)
        cleaned_response = response.replace("\n\n", "\n\t   ")
        temp = "\n\t - " + response
        f.write(temp)
        f.write("\n\n\n")


# Chat API end-point 
@app.post('/api/chat')
async def chat_endpoint(request: ChatRequest):
    try:
        print("[ - ] User response received at API endpoint...")
        print("Extracted Question from API REQUEST: ", request.question)
        print("Extracted Session ID from API REQUEST: ", request.session_id)

        # We pass a Python dictionary containing the keys LangChain expects
        result = conversational_rag_chain.invoke(
            {"input": str(request.question)},
            config={"configurable": {"session_id": request.session_id}}
        )

        # The final text answer from the model lives inside the 'answer' key
        llm_response = result["answer"]

        # Local disk fallback save utility
        try:
            save_llm_response_to_disk(request.question, llm_response)
        except Exception as err:
            print("Error in saving LLM response to disk: ", str(err))

        return {'response': llm_response}

    except Exception as e:
        print("[ ERROR FOUND ]: ", str(e))
        raise HTTPException(status_code=500, detail=str(e))



# Entry-point code here
if __name__=="__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)