package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func main()  {
	httpClient := &http.Client{
		Timeout: 15 * time.Second,
	}
	req, err := http.NewRequest(http.MethodGet, "http://google.com",nil)

	resp, err := httpClient.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	if resp.StatusCode == 200  {
		fmt.Println("It works!!!")
	} else {
		fmt.Println(resp.StatusCode)
	}
}
