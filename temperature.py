import gspread
from oauth2client.service_account import ServiceAccountCredentials
import time
from random import randint

def next_available_row(worksheet):
    return str(len(worksheet.col_values(1))+1)

# use creds to create a client to interact with the Google Drive API
scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)

# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = client.open("RaspberryPi Thermometer").sheet1

while True:
    next_row = next_available_row(sheet)
    #insert on the next available row
    named_tuple = time.localtime() # get struct_time
    time_string = time.strftime("%Y-%m-%dT%H:%M:%S", named_tuple)
    print(time_string)
    sheet.update_acell("A"+next_row, time_string)
    sheet.update_acell("B"+next_row, randint(20,30))
    time.sleep(1)


